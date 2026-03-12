import { useEffect, useRef } from "react"
import * as THREE from "three"

// Compute main cable Y at a given X position
// Main span (-4 to 4): parabola low at y=1.0, high at towers y=5.3
// Side spans: parabola from tower top down to anchor
function cableY(x: number): number {
  if (x >= -4 && x <= 4) {
    // Main span parabola: y = 1.0 + 4.3/16 * x^2
    return 1.0 + (4.3 / 16) * x * x
  } else if (x < -4) {
    // Left side span: from (-4, 5.3) down to (-9.5, 1.6)
    const t = (x + 4) / (-9.5 + 4) // 0 at tower, 1 at anchor
    return 5.3 - 3.7 * t - 0.5 * Math.sin(Math.PI * t)
  } else {
    // Right side span
    const t = (x - 4) / (9.5 - 4)
    return 5.3 - 3.7 * t - 0.5 * Math.sin(Math.PI * t)
  }
}

export function GoldenGateBridge() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x120904, 0.022)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      120
    )
    camera.position.set(-4, 3, 11)
    camera.lookAt(0, 3, 0)

    // ── Materials ──────────────────────────────────────────────────────────
    const matStructure = new THREE.MeshBasicMaterial({ color: 0xb84010 })
    const matBright = new THREE.MeshBasicMaterial({ color: 0xe8521a })
    const matCable = new THREE.LineBasicMaterial({ color: 0xff6b35 })
    const matSuspender = new THREE.LineBasicMaterial({ color: 0xd04518 })
    const matWater = new THREE.MeshBasicMaterial({
      color: 0x0a0906,
      transparent: true,
      opacity: 0.8,
    })

    // ── Helper: create one tower ───────────────────────────────────────────
    const makeTower = (xPos: number) => {
      const g = new THREE.Group()
      // 4 vertical legs: (±0.3, center, ±0.48)
      const legH = 7.0
      const legGeo = new THREE.BoxGeometry(0.13, legH, 0.13)
      const positions = [
        [-0.3, -0.48], [-0.3, 0.48],
        [0.3, -0.48],  [0.3, 0.48],
      ] as [number, number][]
      positions.forEach(([dx, dz]) => {
        const leg = new THREE.Mesh(legGeo, matBright)
        leg.position.set(dx, legH / 2 - 1.5, dz)
        g.add(leg)
      })

      // Horizontal portal beams at each height
      const beamYs = [0.0, 1.3, 2.7, 4.1, 5.3]
      beamYs.forEach((y) => {
        // X-direction beams (front and back faces)
        ;[-0.48, 0.48].forEach((z) => {
          const bx = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.11, 0.11), matStructure)
          bx.position.set(0, y, z)
          g.add(bx)
        })
        // Z-direction beams (left and right columns)
        ;[-0.3, 0.3].forEach((x) => {
          const bz = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.96), matStructure)
          bz.position.set(x, y, 0)
          g.add(bz)
        })
      })

      // Finial caps
      ;[-0.3, 0.3].forEach((dx) => {
        ;[-0.48, 0.48].forEach((dz) => {
          const cap = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.35, 0.16), matBright)
          cap.position.set(dx, legH - 1.5 + 0.18, dz)
          g.add(cap)
        })
      })

      g.position.set(xPos, 0, 0)
      return g
    }

    scene.add(makeTower(-4))
    scene.add(makeTower(4))

    // ── Main suspension cables ─────────────────────────────────────────────
    const makeCable = (zOffset: number) => {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 200; i++) {
        const x = -9.5 + (19 / 200) * i
        pts.push(new THREE.Vector3(x, cableY(x), zOffset))
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      return new THREE.Line(geo, matCable)
    }
    scene.add(makeCable(-0.48))
    scene.add(makeCable(0.48))

    // ── Suspender cables (main span only) ─────────────────────────────────
    const suspGeo = new THREE.BufferGeometry()
    const suspVerts: number[] = []
    ;[-0.48, 0.48].forEach((z) => {
      for (let x = -3.8; x <= 3.8; x += 0.45) {
        const yTop = cableY(x)
        suspVerts.push(x, yTop, z, x, 0, z)
      }
    })
    suspGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(suspVerts, 3)
    )
    scene.add(new THREE.LineSegments(suspGeo, matSuspender))

    // ── Back-stay cables (side spans) ─────────────────────────────────────
    const backGeo = new THREE.BufferGeometry()
    const backVerts: number[] = []
    ;[-0.48, 0.48].forEach((z) => {
      // Left side span fan cables
      for (let x = -9.0; x < -4.2; x += 0.5) {
        const yTop = cableY(x)
        backVerts.push(x, yTop, z, x, 0, z)
      }
      // Right side span
      for (let x = 4.2; x <= 9.0; x += 0.5) {
        const yTop = cableY(x)
        backVerts.push(x, yTop, z, x, 0, z)
      }
    })
    backGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(backVerts, 3)
    )
    scene.add(new THREE.LineSegments(backGeo, matSuspender))

    // ── Deck ───────────────────────────────────────────────────────────────
    const deck = new THREE.Mesh(
      new THREE.BoxGeometry(19, 0.14, 1.0),
      matStructure
    )
    deck.position.set(0, 0, 0)
    scene.add(deck)

    // Deck edge beams
    ;[-0.5, 0.5].forEach((z) => {
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(19, 0.08, 0.08),
        matBright
      )
      edge.position.set(0, 0.11, z)
      scene.add(edge)
    })

    // ── Water plane ───────────────────────────────────────────────────────
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 30),
      matWater
    )
    water.rotation.x = -Math.PI / 2
    water.position.y = -3
    scene.add(water)

    // ── Ambient fog particles ─────────────────────────────────────────────
    const partCount = 600
    const partGeo = new THREE.BufferGeometry()
    const partPos = new Float32Array(partCount * 3)
    for (let i = 0; i < partCount; i++) {
      partPos[i * 3] = (Math.random() - 0.5) * 40
      partPos[i * 3 + 1] = Math.random() * 8 - 2
      partPos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    partGeo.setAttribute("position", new THREE.Float32BufferAttribute(partPos, 3))
    const partMat = new THREE.PointsMaterial({
      color: 0xffdfc8,
      size: 0.04,
      transparent: true,
      opacity: 0.35,
    })
    scene.add(new THREE.Points(partGeo, partMat))

    // ── Resize handler ────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener("resize", onResize)

    // ── Animation loop ────────────────────────────────────────────────────
    let t = 0
    let rafId: number
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      t += 0.0008
      camera.position.x = -4 + Math.sin(t) * 0.6
      camera.position.y = 3.0 + Math.sin(t * 0.6) * 0.25
      camera.lookAt(0, 3, 0)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", onResize)
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
