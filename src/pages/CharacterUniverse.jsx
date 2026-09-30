import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/*
  Install:
    npm i three framer-motion react-router-dom

  REAL 3D CHARACTER MODELS:
    public/models/spiderman.glb
    public/models/hulk.glb
    public/models/ironman.glb
    public/models/blackpanther.glb
    public/models/doctorstrange.glb

  The GLB files are loaded when available. If a model is missing,
  the procedural fallback remains visible, so the page never breaks.

  Use only 3D assets you are licensed/authorized to use.
*/

const universes = {
  spider: {
    id: 'spider',
    name: 'SPIDER',
    fullName: 'SPIDER WORLD',
    subtitle: 'The Web',
    icon: '🕷️',
    description:
      'Agility, precision and the ability to find a way through every challenge.',
    role: 'Agile Problem Solver',
    accent: '#ef4444',
    secondary: '#2563eb',
    gradient: 'from-[#240006] via-[#090912] to-black',
    glow: 'rgba(239,68,68,0.42)',
    pop: 'THWIP!',
    modelUrl: '/models/spiderman.glb',
    modelRotationY: 0,
    pal: {
      suit: '#c1121f',
      leg: '#1d4ed8',
      head: '#c1121f',
      trim: '#1d4ed8',
    },
  },

  hulk: {
    id: 'hulk',
    name: 'HULK',
    fullName: 'HULK WORLD',
    subtitle: 'The Force',
    icon: '💚',
    description:
      'Raw determination, persistence and the strength to keep pushing forward.',
    role: 'Persistent Builder',
    accent: '#22c55e',
    secondary: '#84cc16',
    gradient: 'from-[#032b12] via-[#06130a] to-black',
    glow: 'rgba(34,197,94,0.45)',
    pop: 'SMASH!',
    modelUrl: '/models/hulk.glb',
    modelRotationY: 0,
    pal: {
      suit: '#3fa34d',
      leg: '#6b3fa0',
      head: '#3fa34d',
      trim: '#1c1917',
    },
  },

  iron: {
    id: 'iron',
    name: 'IRON',
    fullName: 'IRON WORLD',
    subtitle: 'The Tech',
    icon: '✊',
    description:
      'Technology, engineering and creativity combined to build intelligent solutions.',
    role: 'Creative Technologist',
    accent: '#f97316',
    secondary: '#facc15',
    gradient: 'from-[#321000] via-[#120a06] to-black',
    glow: 'rgba(249,115,22,0.5)',
    pop: 'BOOM!',
    modelUrl: '/models/ironman.glb',
    modelRotationY: 0,
    pal: {
      suit: '#b91c1c',
      leg: '#b91c1c',
      head: '#facc15',
      trim: '#facc15',
    },
  },

  panther: {
    id: 'panther',
    name: 'PANTHER',
    fullName: 'PANTHER WORLD',
    subtitle: 'The Shadow',
    icon: '🐾',
    description:
      'Focus, strategy and quiet execution with technology at the center.',
    role: 'Strategic Developer',
    accent: '#a855f7',
    secondary: '#7c3aed',
    gradient: 'from-[#18002d] via-[#080611] to-black',
    glow: 'rgba(168,85,247,0.5)',
    pop: 'SLASH!',
    modelUrl: '/models/blackpanther.glb',
    modelRotationY: 0,
    pal: {
      suit: '#17171f',
      leg: '#17171f',
      head: '#17171f',
      trim: '#c4c4e0',
    },
  },

  strange: {
    id: 'strange',
    name: 'STRANGE',
    fullName: 'STRANGE WORLD',
    subtitle: 'The Mystic',
    icon: '🔮',
    description:
      'Curiosity, depth and the discipline to bend complex systems to your will.',
    role: 'Mystic Architect',
    accent: '#fb923c',
    secondary: '#fbbf24',
    gradient: 'from-[#2a1200] via-[#0d0a14] to-black',
    glow: 'rgba(251,146,60,0.5)',
    pop: 'SLING!',
    modelUrl: '/models/doctorstrange.glb',
    modelRotationY: 0,
    pal: {
      suit: '#1e3a8a',
      leg: '#1e293b',
      head: '#e7c9a9',
      trim: '#dc2626',
    },
  },
}

const rnd = (a, b) => a + Math.random() * (b - a)

/* =========================================================
   THEME CURSORS
========================================================= */

const cursors = {
  spider: (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <path
        d="M14 16 L4 8 M14 20 L2 20 M14 24 L4 32 M16 27 L10 37 M26 16 L36 8 M26 20 L38 20 M26 24 L36 32 M24 27 L30 37"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="20" cy="23" rx="7" ry="9" fill="#dc2626" />
      <circle cx="20" cy="12" r="5" fill="#7f1d1d" />
      <circle cx="18" cy="11" r="1.3" fill="#fff" />
      <circle cx="22" cy="11" r="1.3" fill="#fff" />
    </svg>
  ),

  hulk: (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="22" r="15" fill="#22c55e" />
      <path
        d="M5 15 Q20 -4 35 15 L32 9 Q20 1 8 9Z"
        fill="#1c1917"
      />
      <path
        d="M8 17 L18 22 M32 17 L22 22"
        stroke="#052e16"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="24" r="2.2" fill="#fff" />
      <circle cx="26" cy="24" r="2.2" fill="#fff" />
      <path
        d="M11 33 Q20 27 29 33"
        stroke="#052e16"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  ),

  iron: (
    <svg width="40" height="40" viewBox="0 0 40 40">
      {[9, 14.5, 20, 25.5].map((x) => (
        <rect
          key={x}
          x={x}
          y="6"
          width="5"
          height="13"
          rx="2.5"
          fill="#b91c1c"
          stroke="#facc15"
          strokeWidth="1.5"
        />
      ))}
      <rect
        x="9"
        y="14"
        width="22"
        height="19"
        rx="6"
        fill="#b91c1c"
        stroke="#facc15"
        strokeWidth="2"
      />
      <rect
        x="2"
        y="19"
        width="10"
        height="6"
        rx="3"
        fill="#b91c1c"
        stroke="#facc15"
        strokeWidth="1.5"
        transform="rotate(25 7 22)"
      />
      <circle cx="20" cy="26" r="3.2" fill="#e0f2fe" />
    </svg>
  ),

  panther: (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <g fill="#c084fc" stroke="#f3e8ff" strokeWidth="1">
        <path d="M6 4 Q11 24 15 37 Q18 20 6 4Z" />
        <path d="M17 2 Q22 22 26 37 Q29 19 17 2Z" />
        <path d="M28 4 Q33 24 37 35 Q39 19 28 4Z" />
      </g>
    </svg>
  ),

  strange: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle
        cx="20"
        cy="20"
        r="17"
        stroke="#fb923c"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <circle cx="20" cy="20" r="11" stroke="#fdba74" strokeWidth="2" />
      <rect
        x="12"
        y="12"
        width="16"
        height="16"
        stroke="#f97316"
        strokeWidth="1.5"
        transform="rotate(45 20 20)"
      />
      <circle cx="20" cy="20" r="2.5" fill="#fff7ed" />
    </svg>
  ),
}

/* =========================================================
   PROCEDURAL FALLBACK HERO + REAL GLB SUPPORT
========================================================= */

function buildHero(id, c) {
  const g = new THREE.Group()
  const body = new THREE.Group()
  const modelRoot = new THREE.Group()

  g.add(body)
  g.add(modelRoot)

  modelRoot.visible = false

  const M = (color, e = 0) =>
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.34,
      metalness: id === 'iron' ? 0.72 : 0.28,
      emissive: color,
      emissiveIntensity: e,
    })

  const B = (color) => new THREE.MeshBasicMaterial({ color })

  const add = (geo, material, x, y, z, parent = body) => {
    const mesh = new THREE.Mesh(geo, material)
    mesh.position.set(x, y, z)
    parent.add(mesh)
    return mesh
  }

  const width = id === 'hulk' ? 1.45 : id === 'strange' ? 1.04 : 1

  add(
    new THREE.CapsuleGeometry(0.42 * width, 0.75, 5, 14),
    M(c.suit),
    0,
    1.75,
    0,
  )

  add(
    new THREE.SphereGeometry(id === 'hulk' ? 0.36 : 0.31, 24, 18),
    M(c.head, id === 'iron' ? 0.18 : 0),
    0,
    2.65,
    0,
  )

  const limb = (x, y, radius, length, color) => {
    const pivot = new THREE.Group()
    pivot.position.set(x, y, 0)
    body.add(pivot)

    add(
      new THREE.CapsuleGeometry(radius, length, 5, 10),
      M(color),
      0,
      -length / 2 - radius,
      0,
      pivot,
    )

    return pivot
  }

  const hero = {
    g,
    body,
    modelRoot,
    modelBaseY: 0,
    flames: [],
    rings: [],
    energy: [],
    armL: limb(-0.62 * width, 2.15, 0.14 * width, 0.75, c.suit),
    armR: limb(0.62 * width, 2.15, 0.14 * width, 0.75, c.suit),
    legL: limb(-0.22 * width, 1.2, 0.17 * width, 0.85, c.leg),
    legR: limb(0.22 * width, 1.2, 0.17 * width, 0.85, c.leg),
  }

  if (id === 'spider') {
    ;[-1, 1].forEach((s) => {
      add(
        new THREE.SphereGeometry(0.1, 12, 10),
        B('#ffffff'),
        s * 0.12,
        2.7,
        0.27,
      )

      add(
        new THREE.CylinderGeometry(0.045, 0.055, 0.18, 10),
        M('#dbeafe', 0.4),
        s * 0.63,
        1.95,
        0.02,
        s < 0 ? hero.armL : hero.armR,
      )
    })

    const webCore = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.018, 6, 32),
      new THREE.MeshBasicMaterial({
        color: '#e0f2fe',
        transparent: true,
        opacity: 0.7,
      }),
    )

    webCore.position.set(0, 2.1, 0.42)
    body.add(webCore)
    hero.energy.push(webCore)
  }

  if (id === 'hulk') {
    add(
      new THREE.SphereGeometry(
        0.37,
        18,
        14,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2,
      ),
      M(c.trim),
      0,
      2.72,
      -0.03,
    )

    add(
      new THREE.BoxGeometry(1.22, 0.48, 0.74),
      M(c.leg),
      0,
      1.15,
      0,
    )

    add(
      new THREE.SphereGeometry(0.13, 12, 10),
      M('#22c55e', 0.3),
      -0.43,
      2.05,
      0.2,
    )

    add(
      new THREE.SphereGeometry(0.13, 12, 10),
      M('#22c55e', 0.3),
      0.43,
      2.05,
      0.2,
    )
  }

  if (id === 'iron') {
    add(
      new THREE.CylinderGeometry(0.16, 0.16, 0.08, 24),
      B('#7dd3fc'),
      0,
      2.0,
      0.43,
    )

    ;[hero.armL, hero.armR].forEach((arm) => {
      add(
        new THREE.SphereGeometry(0.14, 14, 12),
        B('#bae6fd'),
        0,
        -1.05,
        0,
        arm,
      )
    })

    ;[hero.legL, hero.legR].forEach((leg) => {
      const flame = add(
        new THREE.ConeGeometry(0.16, 0.9, 12),
        B('#fb923c'),
        0,
        -1.6,
        0,
        leg,
      )

      flame.rotation.x = Math.PI
      hero.flames.push(flame)
    })

    ;[-1, 1].forEach((s) => {
      add(
        new THREE.BoxGeometry(0.13, 0.055, 0.05),
        B('#ffffff'),
        s * 0.11,
        2.68,
        0.29,
      )
    })
  }

  if (id === 'panther') {
    ;[-1, 1].forEach((s) => {
      add(
        new THREE.ConeGeometry(0.09, 0.24, 7),
        M(c.suit),
        s * 0.17,
        2.95,
        0,
      )
    })

    ;[hero.armL, hero.armR].forEach((arm) => {
      ;[-0.06, 0, 0.06].forEach((dx) => {
        const claw = add(
          new THREE.ConeGeometry(0.026, 0.34, 7),
          M('#e9d5ff', 1.1),
          dx,
          -1.12,
          0.05,
          arm,
        )

        claw.rotation.x = Math.PI
      })
    })

    const necklace = add(
      new THREE.TorusGeometry(0.3, 0.04, 8, 28),
      M(c.trim, 0.3),
      0,
      2.4,
      0,
    )

    necklace.rotation.x = Math.PI / 2
  }

  if (id === 'strange') {
    const cape = new THREE.Group()
    cape.position.set(0, 2.45, -0.3)
    body.add(cape)
    hero.cape = cape

    const capeMaterial = new THREE.MeshStandardMaterial({
      color: c.trim,
      side: THREE.DoubleSide,
      roughness: 0.62,
      metalness: 0.08,
    })

    add(
      new THREE.PlaneGeometry(1.55, 1.95, 2, 4),
      capeMaterial,
      0,
      -0.95,
      0,
      cape,
    )

    ;[hero.armL, hero.armR].forEach((arm) => {
      const ring = add(
        new THREE.RingGeometry(0.3, 0.42, 40),
        new THREE.MeshBasicMaterial({
          color: '#fb923c',
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.92,
        }),
        0,
        -1.25,
        0.1,
        arm,
      )

      ring.rotation.x = Math.PI / 2
      hero.rings.push(ring)

      const core = add(
        new THREE.SphereGeometry(0.07, 10, 10),
        new THREE.MeshBasicMaterial({ color: '#fde68a' }),
        0,
        -1.25,
        0.15,
        arm,
      )

      hero.energy.push(core)
    })
  }

  return hero
}

function normalizeLoadedModel(root) {
  root.traverse((object) => {
    if (!object.isMesh) return

    object.castShadow = true
    object.receiveShadow = true

    if (!object.material) return

    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material]

    materials.forEach((material) => {
      if ('roughness' in material) {
        material.roughness = Math.min(material.roughness ?? 0.45, 0.7)
      }

      if ('metalness' in material) {
        material.metalness = Math.min(material.metalness ?? 0.2, 0.85)
      }
    })
  })

  const box = new THREE.Box3().setFromObject(root)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const maxDimension = Math.max(size.x, size.y, size.z) || 1
  const scale = 5.1 / maxDimension

  root.scale.setScalar(scale)

  root.position.set(
    -center.x * scale,
    -box.min.y * scale,
    -center.z * scale,
  )

  return root
}

function animateHero(id, h, t, dt, ctx) {
  const s = Math.sin
  const { g, body, modelRoot, armL, armR, legL, legR } = h

  let x = 0
  let y = 2.5
  let z = 0

  if (id === 'spider') {
    const swing = s(t * 1.08) * 0.9
    const anchorX = s(t * 0.34) * 8

    x = anchorX + s(swing) * 10
    y = 13.2 - Math.cos(swing) * 9.5
    z = -3 + s(t * 0.35) * 3

    body.rotation.z = -swing * 0.5
    armR.rotation.z = 2.8
    armL.rotation.set(-1.1, 0, -0.5)
    legL.rotation.x = -0.9 + s(t * 2) * 0.3
    legR.rotation.x = 0.5 + s(t * 2) * 0.3

    h.anchor = [anchorX, 15.2]
    modelRoot.rotation.z = -swing * 0.28
  } else if (id === 'hulk') {
    const phase = Math.abs(s(t * 0.95))

    x = s(t * 0.48) * 8
    y = 0.3 + phase * 4.8
    z = Math.cos(t * 0.48) * 2.5

    armL.rotation.set(s(t * 4) * 0.95, 0, -0.5 - phase)
    armR.rotation.set(-s(t * 4) * 0.95, 0, 0.5 + phase)
    legL.rotation.x = s(t * 4) * 0.7
    legR.rotation.x = -s(t * 4) * 0.7
    body.rotation.x = 0.12 + phase * 0.1

    if (phase < 0.045 && t - (h.lastStomp || 0) > 1.05) {
      h.lastStomp = t
      ctx.stomp()
    }
  } else if (id === 'iron') {
    x = s(t * 0.72) * 9
    y = 4.3 + s(t * 1.28) * 2.3
    z = Math.cos(t * 0.72) * 3.5

    body.rotation.x = 1.25
    body.rotation.z = -s(t * 0.72) * 0.16

    armL.rotation.x = 2.4
    armR.rotation.x = 2.4
    legL.rotation.x = 0.1
    legR.rotation.x = 0.1

    h.flames.forEach((flame, index) => {
      flame.scale.y = 1 + Math.abs(s(t * 18 + index)) * 1.5
      flame.scale.x = 0.8 + Math.abs(s(t * 13 + index)) * 0.4
    })

    modelRoot.rotation.z = -s(t * 0.72) * 0.18
  } else if (id === 'panther') {
    x = s(t * 0.58) * 9
    z = 1 + s(t * 0.3) * 2.5
    y =
      0.55 +
      Math.abs(s(t * 3.5)) * 0.5 +
      Math.max(0, s(t * 1.1)) * 2.5

    body.rotation.x = 0.35
    body.rotation.z = -s(t * 1.2) * 0.08

    armL.rotation.x = s(t * 7) * 1.15
    armR.rotation.x = -s(t * 7) * 1.15
    legL.rotation.x = -s(t * 7) * 1.0
    legR.rotation.x = s(t * 7) * 1.0
  } else {
    x = s(t * 0.46) * 7
    y = 3.2 + s(t * 1.15) * 0.65
    z = Math.cos(t * 0.46) * 2.5

    armL.rotation.z = -1.3 + s(t * 2.2) * 0.22
    armR.rotation.z = 1.3 - s(t * 2.2) * 0.22

    legL.rotation.x = s(t * 1.5) * 0.18
    legR.rotation.x = -s(t * 1.5) * 0.18

    body.rotation.z = s(t * 0.8) * 0.06

    if (h.cape) {
      h.cape.rotation.x = 0.3 + s(t * 3.2) * 0.18
      h.cape.rotation.z = s(t * 1.7) * 0.08
    }

    h.rings.forEach((ring, index) => {
      ring.rotation.z += dt * (index % 2 ? -4 : 4)
      ring.rotation.x = Math.PI / 2 + s(t * 2 + index) * 0.15
    })
  }

  if (modelRoot.visible) {
    modelRoot.position.y = h.modelBaseY + s(t * 2.2) * 0.025
  }

  const prev = h.prev || { x, z }
  const dx = x - prev.x
  const dz = z - prev.z

  if (Math.hypot(dx, dz) > 1e-4) {
    const target = Math.atan2(dx, dz) * 0.72

    const delta = Math.atan2(
      Math.sin(target - g.rotation.y),
      Math.cos(target - g.rotation.y),
    )

    g.rotation.y += delta * 0.09
  }

  h.prev = { x, z }
  g.position.set(x, y, z)
}

/* =========================================================
   THREE.JS WORLD
========================================================= */

function Scene3D({ theme, mouse, onStomp }) {
  const ref = useRef(null)
  const stompRef = useRef(onStomp)
  stompRef.current = onStomp

  useEffect(() => {
    const canvas = ref.current

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(theme.accent, 0.012)

    const cam = new THREE.PerspectiveCamera(52, 1, 0.1, 220)

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      cam.aspect = window.innerWidth / window.innerHeight
      cam.updateProjectionMatrix()
    }

    resize()
    window.addEventListener('resize', resize)

    const accent = new THREE.Color(theme.accent)
    const secondary = new THREE.Color(theme.secondary)

    const lineMat = new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.58,
    })

    const wire = (geo) =>
      new THREE.LineSegments(new THREE.EdgesGeometry(geo), lineMat)

    const spin = []

    const S = (object, rx = 0, ry = 0, rz = 0) => {
      spin.push([object, rx, ry, rz])
      scene.add(object)
      return object
    }

    scene.add(new THREE.HemisphereLight('#dbeafe', '#020617', 1.4))

    const key = new THREE.DirectionalLight('#ffffff', 2.4)
    key.position.set(8, 14, 10)
    key.castShadow = true
    scene.add(key)

    const rim = new THREE.PointLight(accent, 90, 55)
    rim.position.set(-5, 7, 5)
    scene.add(rim)

    const secondaryLight = new THREE.PointLight(secondary, 70, 45)
    secondaryLight.position.set(8, 3, -8)
    scene.add(secondaryLight)

    const STAR_COUNT = 650
    const starPositions = new Float32Array(STAR_COUNT * 3)

    for (let i = 0; i < STAR_COUNT; i += 1) {
      starPositions[i * 3] = rnd(-55, 55)
      starPositions[i * 3 + 1] = rnd(-18, 30)
      starPositions[i * 3 + 2] = rnd(-85, 14)
    }

    const starGeometry = new THREE.BufferGeometry()

    starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3),
    )

    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: accent,
        size: 0.13,
        transparent: true,
        opacity: 0.85,
      }),
    )

    scene.add(stars)

    let grid = null

    if (theme.id !== 'strange') {
      grid = new THREE.GridHelper(70, 48, accent, secondary)
      grid.position.y = -0.05
      grid.material.transparent = true
      grid.material.opacity = 0.22
      scene.add(grid)
    }

    const id = theme.id

    /* ---------------- Spider world ---------------- */

    if (id === 'spider') {
      for (let i = 0; i < 30; i += 1) {
        const width = rnd(1.3, 3.3)
        const depth = rnd(1.4, 3.2)
        const height = rnd(7, 25)
        const geo = new THREE.BoxGeometry(width, height, depth)

        const building = new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({
            color: '#070a16',
            roughness: 0.95,
            metalness: 0.05,
          }),
        )

        const x = rnd(-34, 34)

        building.position.set(
          Math.abs(x) < 6 ? x + (x < 0 ? -8 : 8) : x,
          height / 2,
          -rnd(13, 48),
        )

        building.add(wire(geo))
        scene.add(building)
      }

      const webPoints = []

      for (let i = 0; i < 16; i += 1) {
        const angle = (i / 16) * Math.PI * 2

        webPoints.push(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(
            Math.cos(angle) * 10,
            Math.sin(angle) * 10,
            0,
          ),
        )
      }

      for (let radius = 1; radius <= 7; radius += 1) {
        for (let i = 0; i < 16; i += 1) {
          const a = (i / 16) * Math.PI * 2
          const b = ((i + 1) / 16) * Math.PI * 2
          const r = radius * 1.55

          webPoints.push(
            new THREE.Vector3(
              Math.cos(a) * r,
              Math.sin(a) * r,
              0,
            ),
            new THREE.Vector3(
              Math.cos(b) * r,
              Math.sin(b) * r,
              0,
            ),
          )
        }
      }

      const web = new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(webPoints),
        new THREE.LineBasicMaterial({
          color: '#e0f2fe',
          transparent: true,
          opacity: 0.28,
        }),
      )

      web.position.set(0, 8, -22)
      S(web, 0, 0.04, 0.02)
    }

    /* ---------------- Hulk world ---------------- */

    if (id === 'hulk') {
      for (let i = 0; i < 24; i += 1) {
        const size = rnd(0.5, 2)

        const rock = new THREE.Mesh(
          new THREE.DodecahedronGeometry(size, 1),
          new THREE.MeshStandardMaterial({
            color: '#14532d',
            roughness: 0.9,
            flatShading: true,
            emissive: '#052e16',
            emissiveIntensity: 0.45,
          }),
        )

        rock.position.set(
          rnd(-23, 23),
          rnd(0.3, 13),
          -rnd(4, 31),
        )

        S(
          rock,
          rnd(-0.5, 0.5),
          rnd(-0.5, 0.5),
          rnd(-0.25, 0.25),
        )
      }

      for (let i = 0; i < 10; i += 1) {
        const height = rnd(5, 13)

        const pillar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.55, 0.85, height, 6),
          new THREE.MeshStandardMaterial({
            color: '#111827',
            roughness: 1,
            emissive: '#064e3b',
            emissiveIntensity: 0.25,
          }),
        )

        pillar.position.set(
          (i % 2 ? 1 : -1) * rnd(7, 25),
          height / 2,
          -rnd(8, 36),
        )

        scene.add(pillar)
      }
    }

    /* ---------------- Iron Man world ---------------- */

    if (id === 'iron') {
      for (let i = 0; i < 6; i += 1) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(4 + i * 1.8, 0.035, 8, 100),
          new THREE.MeshBasicMaterial({
            color: i % 2 ? '#facc15' : accent,
            transparent: true,
            opacity: 0.55,
          }),
        )

        ring.position.set(0, 5.5, -15)

        S(
          ring,
          0.2 * (i + 1),
          0.25 - i * 0.09,
          0.03,
        )
      }

      for (let i = 0; i < 18; i += 1) {
        const shard = wire(
          new THREE.OctahedronGeometry(rnd(0.35, 1.15)),
        )

        shard.position.set(
          rnd(-20, 20),
          rnd(1, 14),
          -rnd(4, 30),
        )

        S(
          shard,
          rnd(-0.6, 0.6),
          rnd(-0.6, 0.6),
          rnd(-0.3, 0.3),
        )
      }
    }

    /* ---------------- Black Panther world ---------------- */

    if (id === 'panther') {
      for (let i = 0; i < 22; i += 1) {
        const height = rnd(5, 20)
        const geo = new THREE.BoxGeometry(0.9, height, 0.9)

        const pillar = new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({
            color: '#090514',
            roughness: 0.6,
            metalness: 0.45,
            emissive: '#6d28d9',
            emissiveIntensity: 0.3,
          }),
        )

        const x = (i % 2 ? 1 : -1) * rnd(6, 28)

        pillar.position.set(
          x,
          height / 2,
          -rnd(7, 38),
        )

        pillar.add(wire(geo))
        scene.add(pillar)
      }

      for (let i = 0; i < 18; i += 1) {
        const shard = wire(
          new THREE.TetrahedronGeometry(rnd(0.45, 1.3)),
        )

        shard.position.set(
          rnd(-17, 17),
          rnd(1, 13),
          -rnd(3, 25),
        )

        S(
          shard,
          rnd(-0.8, 0.8),
          rnd(-0.8, 0.8),
          rnd(-1, 1),
        )
      }
    }

    /* ---------------- Doctor Strange world ---------------- */

    if (id === 'strange') {
      const portalMaterial = (color, opacity) =>
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          side: THREE.DoubleSide,
        })

      const makePortal = (geometry, opacity, rotationZ) => {
        const portal = new THREE.Mesh(
          geometry,
          portalMaterial(theme.accent, opacity),
        )

        portal.position.set(0, 6, -18)
        portal.rotation.z = rotationZ

        S(portal, 0, 0.25, 0)
      }

      makePortal(
        new THREE.RingGeometry(9, 9.12, 96),
        0.68,
        0.08,
      )

      makePortal(
        new THREE.RingGeometry(7.1, 7.2, 8),
        0.55,
        -0.15,
      )

      makePortal(
        new THREE.RingGeometry(5.7, 5.82, 64),
        0.48,
        0.28,
      )

      makePortal(
        new THREE.RingGeometry(4.1, 4.2, 4),
        0.52,
        0.2,
      )

      for (let i = 0; i < 16; i += 1) {
        const rune = new THREE.Mesh(
          new THREE.RingGeometry(0.35, 0.42, 4),
          portalMaterial(
            i % 2 ? theme.secondary : theme.accent,
            0.65,
          ),
        )

        rune.position.set(
          rnd(-15, 15),
          rnd(0.5, 14),
          -rnd(3, 18),
        )

        S(
          rune,
          rnd(-0.6, 0.6),
          rnd(-0.6, 0.6),
          rnd(-1.5, 1.5),
        )
      }

      for (let i = 0; i < 9; i += 1) {
        const cube = wire(
          new THREE.BoxGeometry(
            rnd(0.35, 0.9),
            rnd(0.35, 0.9),
            rnd(0.35, 0.9),
          ),
        )

        cube.position.set(
          rnd(-12, 12),
          rnd(1, 13),
          -rnd(2, 20),
        )

        S(
          cube,
          rnd(-0.5, 0.5),
          rnd(-0.5, 0.5),
          rnd(-0.5, 0.5),
        )
      }
    }

    // Hero
    const hero = buildHero(id, theme.pal)
    hero.g.scale.setScalar(1.12)
    scene.add(hero.g)

    let webLine = null

    if (id === 'spider') {
      webLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(),
          new THREE.Vector3(),
        ]),
        new THREE.LineBasicMaterial({
          color: '#ffffff',
          transparent: true,
          opacity: 0.85,
        }),
      )

      scene.add(webLine)
    }

    // Real GLB model loader.
    let disposed = false

    if (theme.modelUrl) {
      const loader = new GLTFLoader()

      loader.load(
        theme.modelUrl,
        (gltf) => {
          if (disposed) return

          const model = normalizeLoadedModel(gltf.scene)

          hero.modelBaseY = model.position.y
          hero.modelRoot.add(model)
          hero.modelRoot.visible = true
          hero.body.visible = false
          hero.modelRoot.rotation.y = theme.modelRotationY || 0
        },
        undefined,
        (error) => {
          console.warn(
            `3D model could not load: ${theme.modelUrl}`,
            error,
          )
        },
      )
    }

    const heroLight = new THREE.PointLight(
      accent,
      35,
      18,
    )

    heroLight.position.set(0, 3, 2)
    hero.g.add(heroLight)

    const ctx = {
      stomp: () => {
        if (stompRef.current) stompRef.current()
      },
    }

    let raf
    let last = performance.now()
    let t = 0
    let cx = 0
    let cy = 0

    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)

      last = now
      t += dt

      for (const [object, rx, ry, rz] of spin) {
        object.rotation.x += rx * dt
        object.rotation.y += ry * dt
        object.rotation.z += rz * dt
      }

      for (let i = 0; i < STAR_COUNT; i += 1) {
        starPositions[i * 3 + 2] += dt * 3.2

        if (starPositions[i * 3 + 2] > 14) {
          starPositions[i * 3 + 2] = -85
        }
      }

      starGeometry.attributes.position.needsUpdate = true

      if (grid) {
        grid.position.z = (t * 2.2) % 1.5
      }

      animateHero(id, hero, t, dt, ctx)

      if (webLine && hero.anchor) {
        const positions = webLine.geometry.attributes.position
        const p = hero.g.position

        positions.setXYZ(
          0,
          hero.anchor[0],
          hero.anchor[1],
          p.z,
        )

        positions.setXYZ(
          1,
          p.x,
          p.y + 3.4,
          p.z,
        )

        positions.needsUpdate = true
      }

      cx += (mouse.current.x * 3.5 - cx) * 0.045
      cy += (-mouse.current.y * 1.8 - cy) * 0.045

      cam.position.set(cx, 3.8 + cy, 15.5)
      cam.lookAt(0, 3.4, 0)

      renderer.render(scene, cam)

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)

      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose()
        }

        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material]

          materials.forEach((material) => material.dispose())
        }
      })

      renderer.dispose()
    }
  }, [theme, mouse])

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
      aria-hidden="true"
    />
  )
}

/* =========================================================
   TAP / ATTACK EFFECTS
========================================================= */

function makeFx(id, x, y, type) {
  const sparks = Array.from({ length: 24 }, (_, index) => ({
    a:
      (index / 24) * Math.PI * 2 +
      Math.random() * 0.3,
    d: 70 + Math.random() * 150,
    s: 2 + Math.random() * 4,
  }))

  const crack = Array.from({ length: 10 }, (_, index) => {
    let angle =
      (index / 10) * Math.PI * 2 +
      Math.random() * 0.4

    let px = x
    let py = y

    const points = [[x, y]]

    for (let step = 0; step < 6; step += 1) {
      angle += (Math.random() - 0.5) * 0.7

      const length = 20 + Math.random() * 32

      px += Math.cos(angle) * length
      py += Math.sin(angle) * length

      points.push([px, py])
    }

    const d =
      'M' +
      points
        .map((point) =>
          point
            .map((number) => number.toFixed(0))
            .join(' '),
        )
        .join(' L')

    return {
      d,
      b: d,
    }
  })

  const side =
    x < window.innerWidth / 2
      ? window.innerWidth * 0.85
      : window.innerWidth * 0.15

  return {
    id,
    x,
    y,
    type,
    sparks,
    crack,
    ox: side,
    oy: window.innerHeight + 20,
  }
}

function ClickEffect({ fx, theme }) {
  const { x, y, type, sparks, crack } = fx

  const draw = {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
  }

  const glowStyle = {
    filter: `drop-shadow(0 0 12px ${theme.accent})`,
  }

  const spoke = (index, count, radius) => [
    x +
      Math.cos((index / count) * Math.PI * 2) *
        radius,
    y +
      Math.sin((index / count) * Math.PI * 2) *
        radius,
  ]

  return (
    <motion.svg
      className="pointer-events-none fixed inset-0 z-[9000] h-full w-full"
      style={glowStyle}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{
        duration: 1.55,
        times: [0, 0.58, 1],
      }}
    >
      {/* SPIDER: web shot + expanding web + particles */}
      {type === 'spider' &&
        (() => {
          const webPaths = [34, 62, 94].map((radius) =>
            Array.from({ length: 12 }, (_, index) => {
              const [ax, ay] = spoke(
                index,
                12,
                radius,
              )

              const [bx, by] = spoke(
                index + 1,
                12,
                radius,
              )

              const [mx, my] = spoke(
                index + 0.5,
                12,
                radius * 0.84,
              )

              return `M${ax} ${ay} Q${mx} ${my} ${bx} ${by}`
            }).join(' '),
          )

          return (
            <>
              <motion.path
                d={`M${fx.ox} ${fx.oy} Q${
                  (fx.ox + x) / 2 + 50
                } ${
                  (fx.oy + y) / 2 - 90
                } ${x} ${y}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.8"
                {...draw}
                transition={{
                  duration: 0.2,
                  ease: 'easeOut',
                }}
              />

              {Array.from({ length: 12 }, (_, index) => {
                const [ex, ey] = spoke(
                  index,
                  12,
                  100,
                )

                return (
                  <motion.line
                    key={index}
                    x1={x}
                    y1={y}
                    x2={ex}
                    y2={ey}
                    stroke="#ffffff"
                    strokeWidth="1.7"
                    {...draw}
                    transition={{
                      delay: 0.18,
                      duration: 0.22,
                    }}
                  />
                )
              })}

              {webPaths.map((path, index) => (
                <motion.path
                  key={index}
                  d={path}
                  fill="none"
                  stroke="#dbeafe"
                  strokeWidth="1.3"
                  {...draw}
                  transition={{
                    delay: 0.28 + index * 0.07,
                    duration: 0.28,
                  }}
                />
              ))}

              <motion.circle
                cx={x}
                cy={y}
                fill="#ffffff"
                initial={{ r: 0 }}
                animate={{ r: [0, 16, 7] }}
                transition={{
                  delay: 0.14,
                  duration: 0.32,
                }}
              />

              {sparks.slice(0, 12).map((spark, index) => (
                <motion.circle
                  key={index}
                  r={spark.s * 0.7}
                  fill="#93c5fd"
                  initial={{
                    cx: x,
                    cy: y,
                    opacity: 1,
                  }}
                  animate={{
                    cx:
                      x +
                      Math.cos(spark.a) *
                        spark.d,
                    cy:
                      y +
                      Math.sin(spark.a) *
                        spark.d,
                    opacity: 0,
                  }}
                  transition={{
                    delay: 0.16,
                    duration: 0.65,
                  }}
                />
              ))}
            </>
          )
        })()}

      {/* HULK: ground impact + cracks + debris */}
      {type === 'hulk' && (
        <>
          <motion.circle
            cx={x}
            cy={y}
            fill="none"
            stroke="#4ade80"
            strokeWidth="7"
            initial={{
              r: 0,
              opacity: 1,
            }}
            animate={{
              r: 220,
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          />

          <motion.circle
            cx={x}
            cy={y}
            fill="rgba(34,197,94,0.15)"
            initial={{
              r: 0,
              opacity: 1,
            }}
            animate={{
              r: 85,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
          />

          {crack.map((item, index) => (
            <motion.path
              key={index}
              d={item.d}
              fill="none"
              stroke="#22c55e"
              strokeWidth="6"
              strokeOpacity="0.72"
              strokeLinejoin="round"
              {...draw}
              transition={{
                duration: 0.3,
                delay: index * 0.025,
              }}
            />
          ))}

          {sparks.slice(0, 16).map((spark, index) => (
            <motion.rect
              key={index}
              width={spark.s * 2}
              height={spark.s * 2}
              fill="#14532d"
              stroke="#4ade80"
              initial={{
                x,
                y,
                opacity: 1,
              }}
              animate={{
                x:
                  x +
                  Math.cos(spark.a) *
                    spark.d *
                    0.8,
                y:
                  y -
                  70 -
                  spark.d * 0.4,
                opacity: 0,
                rotate: 360,
              }}
              transition={{
                duration: 0.85,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}

      {/* IRON MAN: repulsor flash + concentric blast */}
      {type === 'iron' && (
        <>
          <defs>
            <radialGradient
              id={`ironFx${fx.id}`}
            >
              <stop
                offset="0%"
                stopColor="#ffffff"
              />
              <stop
                offset="28%"
                stopColor="#fde047"
              />
              <stop
                offset="62%"
                stopColor="#f97316"
              />
              <stop
                offset="100%"
                stopColor="#7f1d1d"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          <motion.rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#fff7ed"
            initial={{ opacity: 0.35 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          />

          <motion.circle
            cx={x}
            cy={y}
            fill={`url(#ironFx${fx.id})`}
            initial={{
              r: 0,
              opacity: 1,
            }}
            animate={{
              r: [0, 80, 130],
              opacity: [1, 0.9, 0],
            }}
            transition={{
              duration: 0.75,
            }}
          />

          {[0, 1, 2, 3].map((index) => (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              fill="none"
              stroke={
                index % 2
                  ? '#f97316'
                  : '#fde047'
              }
              strokeWidth={5 - index}
              initial={{
                r: 10,
                opacity: 1,
              }}
              animate={{
                r: 130 + index * 55,
                opacity: 0,
              }}
              transition={{
                delay: index * 0.06,
                duration: 0.85,
                ease: 'easeOut',
              }}
            />
          ))}

          {sparks.map((spark, index) => (
            <motion.line
              key={index}
              x1={x}
              y1={y}
              x2={
                x +
                Math.cos(spark.a) *
                  spark.d *
                  1.25
              }
              y2={
                y +
                Math.sin(spark.a) *
                  spark.d *
                  1.25
              }
              stroke="#fde047"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{
                pathLength: 0,
                opacity: 1,
              }}
              animate={{
                pathLength: 1,
                opacity: 0,
              }}
              transition={{
                duration: 0.55,
              }}
            />
          ))}
        </>
      )}

      {/* BLACK PANTHER: three glowing claw cuts */}
      {type === 'panther' && (
        <>
          <motion.circle
            cx={x}
            cy={y}
            fill="rgba(168,85,247,0.35)"
            initial={{
              r: 0,
              opacity: 1,
            }}
            animate={{
              r: 110,
              opacity: 0,
            }}
            transition={{
              duration: 0.65,
            }}
          />

          {[-1, 0, 1].map((offset, index) => {
            const ox = x + offset * 32

            const path = `M${ox - 60} ${
              y - 90
            } Q${ox - 12} ${
              y - 8
            } ${ox + 38} ${y + 90}`

            return (
              <motion.g key={offset}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeOpacity="0.42"
                  {...draw}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.22,
                  }}
                />

                <motion.path
                  d={path}
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="7"
                  strokeLinecap="round"
                  {...draw}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.22,
                  }}
                />

                <motion.path
                  d={path}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  {...draw}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.22,
                  }}
                />
              </motion.g>
            )
          })}

          {sparks.slice(0, 14).map((spark, index) => (
            <motion.circle
              key={index}
              r={spark.s * 0.8}
              fill="#e9d5ff"
              initial={{
                cx: x,
                cy: y,
                opacity: 1,
              }}
              animate={{
                cx:
                  x +
                  Math.cos(spark.a) *
                    spark.d,
                cy:
                  y +
                  Math.sin(spark.a) *
                    spark.d,
                opacity: 0,
              }}
              transition={{
                delay: 0.12,
                duration: 0.65,
              }}
            />
          ))}
        </>
      )}

      {/* DOCTOR STRANGE: sling-ring portal */}
      {type === 'strange' && (
        <>
          <motion.circle
            cx={x}
            cy={y}
            fill="rgba(251,146,60,0.2)"
            initial={{
              r: 0,
              opacity: 1,
            }}
            animate={{
              r: 125,
              opacity: 0,
            }}
            transition={{
              duration: 0.9,
            }}
          />

          <motion.g
            style={{
              transformOrigin: `${x}px ${y}px`,
            }}
            initial={{
              scale: 0,
              rotate: -90,
            }}
            animate={{
              scale: [0, 1.12, 1],
              rotate: 120,
            }}
            transition={{
              duration: 1.15,
              ease: 'easeOut',
            }}
          >
            <circle
              cx={x}
              cy={y}
              r="82"
              fill="none"
              stroke="#fb923c"
              strokeWidth="4"
              strokeDasharray="11 7"
            />

            <circle
              cx={x}
              cy={y}
              r="62"
              fill="none"
              stroke="#fdba74"
              strokeWidth="2"
            />

            <rect
              x={x - 44}
              y={y - 44}
              width="88"
              height="88"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
            />

            <rect
              x={x - 44}
              y={y - 44}
              width="88"
              height="88"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              transform={`rotate(45 ${x} ${y})`}
            />

            {Array.from(
              { length: 12 },
              (_, index) => {
                const [ax, ay] = spoke(
                  index,
                  12,
                  86,
                )

                const [bx, by] = spoke(
                  index,
                  12,
                  103,
                )

                return (
                  <line
                    key={index}
                    x1={ax}
                    y1={ay}
                    x2={bx}
                    y2={by}
                    stroke="#fde68a"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )
              },
            )}
          </motion.g>

          {sparks.map((spark, index) => (
            <motion.circle
              key={index}
              r={spark.s}
              fill={
                index % 2
                  ? '#fde047'
                  : '#fb923c'
              }
              initial={{
                cx: x,
                cy: y,
                opacity: 1,
              }}
              animate={{
                cx:
                  x +
                  Math.cos(
                    spark.a + 1.2,
                  ) *
                    spark.d *
                    1.1,
                cy:
                  y +
                  Math.sin(
                    spark.a + 1.2,
                  ) *
                    spark.d *
                    1.1,
                opacity: 0,
              }}
              transition={{
                delay: 0.1,
                duration: 0.9,
              }}
            />
          ))}
        </>
      )}

      <motion.g
        style={{
          transformOrigin: `${x}px ${y - 120}px`,
        }}
        initial={{
          scale: 0,
          rotate: -12,
        }}
        animate={{
          scale: [0, 1.35, 1],
          rotate: [-12, 6, -4],
        }}
        transition={{ duration: 0.35 }}
      >
        <text
          x={x}
          y={y - 120}
          textAnchor="middle"
          fontSize="34"
          fontWeight="900"
          fill={theme.accent}
          stroke="#000"
          strokeWidth="6"
          paintOrder="stroke"
          style={{
            fontFamily:
              'Impact, Arial Black, sans-serif',
            letterSpacing: 2,
          }}
        >
          {theme.pop}
        </text>
      </motion.g>
    </motion.svg>
  )
}

/* =========================================================
   PORTAL BACK BUTTON
========================================================= */

function PortalBackButton({ theme, onBack }) {
  return (
    <motion.button
      onClick={onBack}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Return to portfolio"
      title="Return to portfolio"
      className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-xl"
    >
      <motion.span
        className="absolute -inset-2 rounded-full border border-dashed"
        style={{
          borderColor: `${theme.accent}90`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.span
        className="absolute -inset-1 rounded-full border border-white/10"
        animate={{ rotate: -360 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <span className="relative z-10 text-lg transition-transform group-hover:-translate-x-0.5">
        ↩
      </span>
    </motion.button>
  )
}

/* =========================================================
   MAIN
========================================================= */

export default function CharacterUniverse() {
  const navigate = useNavigate()

  const [activeTheme, setActiveTheme] =
    useState('spider')

  const [introVisible, setIntroVisible] =
    useState(true)

  const [showInfo, setShowInfo] =
    useState(false)

  const [leaving, setLeaving] =
    useState(false)

  const [fx, setFx] = useState([])

  const theme = universes[activeTheme]

  const mouse = useRef({
    x: 0,
    y: 0,
  })

  const cursorRef = useRef(null)
  const lightRef = useRef(null)
  const idRef = useRef(0)

  const shake = useAnimation()

  const quake = (power = 1) => {
    shake.start({
      x: [
        0,
        -10 * power,
        9 * power,
        -6 * power,
        4 * power,
        0,
      ],
      y: [
        0,
        6 * power,
        -7 * power,
        4 * power,
        -2 * power,
        0,
      ],
      transition: {
        duration: 0.4,
      },
    })
  }

  useEffect(() => {
    const timer = setTimeout(
      () => setIntroVisible(false),
      3800,
    )

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const move = (event) => {
      if (
        event.pointerType &&
        event.pointerType !== 'mouse'
      ) {
        return
      }

      mouse.current = {
        x:
          (event.clientX / window.innerWidth - 0.5) *
          2,
        y:
          (event.clientY / window.innerHeight - 0.5) *
          2,
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${event.clientX - 20}px, ${event.clientY - 20}px)`
        cursorRef.current.style.opacity = 1
      }

      if (lightRef.current) {
        lightRef.current.style.transform = `translate(${event.clientX - 200}px, ${event.clientY - 200}px)`
      }
    }

    window.addEventListener(
      'pointermove',
      move,
    )

    return () =>
      window.removeEventListener(
        'pointermove',
        move,
      )
  }, [])

  const fire = (event) => {
    const target = event.target

    if (
      target instanceof Element &&
      target.closest('button, a')
    ) {
      return
    }

    const id = ++idRef.current

    setFx((previous) => [
      ...previous.slice(-5),
      makeFx(
        id,
        event.clientX,
        event.clientY,
        activeTheme,
      ),
    ])

    window.setTimeout(() => {
      setFx((previous) =>
        previous.filter(
          (item) => item.id !== id,
        ),
      )
    }, 1700)

    if (activeTheme === 'spider') {
      quake(0.22)
    }

    if (activeTheme === 'hulk') {
      quake(1.35)
    }

    if (activeTheme === 'iron') {
      quake(0.82)
    }

    if (activeTheme === 'panther') {
      quake(0.48)
    }

    if (activeTheme === 'strange') {
      quake(0.62)
    }
  }

  const changeTheme = (id) => {
    setActiveTheme(id)
    setShowInfo(false)
    setFx([])
  }

  const leavePortal = () => {
    if (leaving) return

    setLeaving(true)

    window.setTimeout(
      () => navigate('/'),
      1050,
    )
  }

  return (
    <main
      className="cu relative min-h-screen overflow-hidden bg-black text-white"
      onPointerDown={fire}
      style={{ cursor: 'none' }}
    >
      <style>{`
        .cu, .cu * {
          cursor: none !important;
        }

        @media (max-width: 767px) {
          .cu, .cu * {
            cursor: auto !important;
          }
        }
      `}</style>

      <AnimatePresence mode="wait">
        <motion.div
          key={theme.id}
          initial={{
            opacity: 0,
            scale: 1.08,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
          }}
          transition={{ duration: 0.8 }}
          className={`fixed inset-0 bg-gradient-to-br ${theme.gradient}`}
        />
      </AnimatePresence>

      <motion.div
        key={`glow-${theme.id}`}
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 1,
          scale: {
            duration: 7,
            repeat: Infinity,
          },
        }}
        className="pointer-events-none fixed left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        style={{
          background: theme.glow,
        }}
      />

      <div
        ref={lightRef}
        className="pointer-events-none fixed left-0 top-0 z-[4] h-[400px] w-[400px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: theme.glow,
        }}
      />

      <Scene3D
        theme={theme}
        mouse={mouse}
        onStomp={() => quake(0.6)}
      />

      <div className="pointer-events-none fixed inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.75)_100%)]" />

      {fx.map((effect) => (
        <ClickEffect
          key={effect.id}
          fx={effect}
          theme={universes[effect.type]}
        />
      ))}

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden opacity-0 md:block"
        style={{
          filter: `drop-shadow(0 0 8px ${theme.accent})`,
        }}
      >
        <motion.div
          key={theme.id}
          initial={{
            scale: 0,
            rotate: -90,
          }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 15,
          }}
        >
          {theme.id === 'strange' ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {cursors.strange}
            </motion.div>
          ) : (
            cursors[theme.id]
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {introVisible && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.6,
              y: 80,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 1.35,
              y: -100,
              filter: 'blur(12px)',
            }}
            transition={{ duration: 0.8 }}
            className="fixed left-1/2 top-1/2 z-[100] -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className="relative w-[290px] rounded-[35px] border border-white/20 bg-black/55 px-7 py-7 text-center backdrop-blur-2xl md:w-[440px]"
              style={{
                boxShadow: `0 0 80px ${theme.glow}`,
              }}
            >
              <div className="text-4xl">
                {theme.icon}
              </div>

              <p className="mt-4 text-[10px] uppercase tracking-[0.45em] text-white/40">
                Welcome
              </p>

              <h1 className="mt-3 text-2xl font-bold md:text-4xl">
                Srikar&apos;s Universe
              </h1>

              <p className="mt-3 text-xs text-white/55 md:text-sm">
                A different side of my personality,
                creativity and technology.
              </p>

              <p
                className="mt-5 text-[10px] uppercase tracking-[0.3em]"
                style={{ color: theme.accent }}
              >
                Move your cursor • Tap anywhere
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={shake}
        className="relative z-[100]"
      >
        <header className="relative z-[200] flex items-center justify-between px-5 py-5 md:px-10">
          <div className="flex items-center gap-5">
            <PortalBackButton
              theme={theme}
              onBack={leavePortal}
            />

            <div className="hidden md:block">
              <p className="text-[9px] uppercase tracking-[0.45em] text-white/30">
                Exit Universe
              </p>

              <p
                className="mt-1 text-xs font-semibold"
                style={{ color: theme.accent }}
              >
                Back to Portfolio
              </p>
            </div>
          </div>

          <motion.div
            key={theme.id}
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-right"
          >
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/30">
              Character Universe
            </p>

            <p
              className="mt-1 text-xs font-bold tracking-wider"
              style={{
                color: theme.accent,
                textShadow: `0 0 20px ${theme.glow}`,
              }}
            >
              {theme.fullName}
            </p>
          </motion.div>
        </header>

        <section className="relative flex min-h-[calc(100vh-90px)] flex-col items-center justify-end px-5 pb-16 pt-5">
          <AnimatePresence mode="wait">
            <motion.h2
              key={theme.id}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="mb-6 text-xl font-black tracking-[0.25em] md:text-3xl"
              style={{
                color: theme.accent,
                textShadow: `0 0 30px ${theme.glow}`,
              }}
            >
              {theme.name}
            </motion.h2>
          </AnimatePresence>

          <motion.button
            onClick={leavePortal}
            aria-label="Close portal and go back"
            className="relative rounded-full"
            animate={
              leaving
                ? {
                    scale: 0,
                    rotate: 540,
                    opacity: 0,
                    filter: 'blur(14px)',
                  }
                : {
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                  }
            }
            transition={{
              duration: 0.9,
              ease: 'easeIn',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -inset-10 rounded-full border border-dashed opacity-50"
              style={{
                borderColor: theme.accent,
                boxShadow: `0 0 50px ${theme.glow}`,
              }}
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -inset-6 rounded-full border border-white/10"
            />

            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.04, 1],
              }}
              transition={{
                rotate: {
                  duration: 7,
                  repeat: Infinity,
                  ease: 'linear',
                },
                scale: {
                  duration: 2.5,
                  repeat: Infinity,
                },
              }}
              className="absolute -inset-3 rounded-full border-2"
              style={{
                borderColor: `${theme.accent}70`,
              }}
            />

            <motion.div
              whileHover={{ scale: 1.04 }}
              className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-white/70 bg-black md:h-44 md:w-44"
              style={{
                boxShadow: `0 0 30px ${theme.glow}, 0 0 100px ${theme.glow}`,
              }}
            >
              <img
                src="/srikarmalla.png"
                alt="Srikar Malla"
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10" />

              <motion.div
                animate={{
                  y: ['-100%', '300%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute left-0 h-1/3 w-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
              />
            </motion.div>
          </motion.button>

          <motion.div
            animate={{
              opacity: leaving ? 0 : 1,
            }}
            className="mt-8 text-center"
          >
            <p
              className="text-[10px] uppercase tracking-[0.5em]"
              style={{ color: theme.accent }}
            >
              {theme.role}
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              SRIKAR MALLA
            </h1>

            <p className="mt-2 text-xs text-white/45 md:text-sm">
              Developer • CSE • Creative Technologist
            </p>

            <AnimatePresence mode="wait">
              <motion.p
                key={theme.id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/55"
              >
                {theme.description}
              </motion.p>
            </AnimatePresence>

            <p className="mt-3 text-[10px] text-white/30">
              Tap anywhere to trigger the world&apos;s ability
            </p>
          </motion.div>

          <motion.button
            onClick={() => setShowInfo(!showInfo)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 rounded-full border px-5 py-2 text-[10px] uppercase tracking-[0.25em]"
            style={{
              borderColor: `${theme.accent}70`,
              color: theme.accent,
              background: `${theme.accent}10`,
            }}
          >
            {showInfo
              ? 'Close Profile'
              : 'Explore Profile'}
          </motion.button>

          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: -15,
                }}
                className="mt-5 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl"
              >
                <div className="grid grid-cols-2 gap-px bg-white/5">
                  {[
                    [
                      'Field',
                      'Computer Science',
                    ],
                    [
                      'Focus',
                      'Full Stack Development',
                    ],
                    [
                      'Current Mode',
                      theme.role,
                    ],
                    [
                      'Universe',
                      theme.name,
                    ],
                  ].map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-black/20 p-5"
                    >
                      <p className="text-[9px] uppercase tracking-widest text-white/30">
                        {key}
                      </p>

                      <p className="mt-2 text-sm text-white/80">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 w-full max-w-4xl">
            <p className="mb-5 text-center text-[9px] uppercase tracking-[0.45em] text-white/30">
              Choose your universe
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {Object.values(universes).map(
                (item) => {
                  const selected =
                    activeTheme === item.id

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() =>
                        changeTheme(item.id)
                      }
                      whileHover={{
                        y: -5,
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                      className="relative overflow-hidden rounded-2xl border px-4 py-5 text-left"
                      style={{
                        borderColor: selected
                          ? `${item.accent}90`
                          : 'rgba(255,255,255,0.08)',
                        background: selected
                          ? `${item.accent}12`
                          : 'rgba(0,0,0,0.3)',
                        boxShadow: selected
                          ? `0 0 35px ${item.glow}`
                          : 'none',
                      }}
                    >
                      <div className="text-2xl">
                        {item.icon}
                      </div>

                      <p
                        className="mt-3 text-xs font-bold tracking-wider"
                        style={{
                          color: selected
                            ? item.accent
                            : 'rgba(255,255,255,0.8)',
                        }}
                      >
                        {item.name}
                      </p>

                      <p className="mt-1 text-[9px] text-white/35">
                        {item.subtitle}
                      </p>

                      {selected && (
                        <motion.div
                          layoutId="universeSelected"
                          className="absolute inset-0 rounded-2xl border"
                          style={{
                            borderColor: `${item.accent}70`,
                          }}
                        />
                      )}
                    </motion.button>
                  )
                },
              )}
            </div>
          </div>
        </section>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          opacity: leaving ? 1 : 0,
        }}
        transition={{
          delay: 0.45,
          duration: 0.6,
        }}
        className="pointer-events-none fixed inset-0 z-[10000] bg-black"
      />
    </main>
  )
}
