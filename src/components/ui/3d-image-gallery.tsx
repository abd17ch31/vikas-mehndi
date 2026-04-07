"use client";

import {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, OrbitControls, Sphere } from "@react-three/drei";
import { Download, Heart, X } from "lucide-react";

type GalleryCard = {
  id: string;
  imageUrl: string;
  alt: string;
  title: string;
};

type CardContextType = {
  selectedCard: GalleryCard | null;
  setSelectedCard: (card: GalleryCard | null) => void;
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
  cards: GalleryCard[];
};

const CardContext = createContext<CardContextType | undefined>(undefined);

function useCard() {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("useCard must be used within StellarCardGallery");
  }

  return context;
}

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    mountRef.current.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 7000;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 1800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1800;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1800;
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    camera.position.z = 10;

    let animationId = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      stars.rotation.y += 0.00012;
      stars.rotation.x += 0.00006;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;

      const nextWidth = mountRef.current.clientWidth || window.innerWidth;
      const nextHeight = mountRef.current.clientHeight || window.innerHeight;

      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);

      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 bg-black" />;
}

function FloatingCard({
  card,
  index,
  position,
}: {
  card: GalleryCard;
  index: number;
  position: { x: number; y: number; z: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedIndex } = useCard();

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "auto",
        }}
      >
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setSelectedIndex(index);
          }}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          onPointerEnter={() => {
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
          className="select-none rounded-lg bg-[#1F2121] p-3 text-left shadow-2xl"
          style={{
            width: "160px",
            height: "208px",
            touchAction: "manipulation",
            boxShadow: hovered
              ? "0 25px 50px rgba(49, 184, 198, 0.5), 0 0 30px rgba(49, 184, 198, 0.3)"
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered ? "2px solid rgba(49, 184, 198, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <img
            src={card.imageUrl}
            alt={card.alt}
            className="h-40 w-full rounded-md object-cover"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-1 text-center">
            <p className="truncate text-xs font-medium text-white">{card.title}</p>
          </div>
        </button>
      </Html>
    </group>
  );
}

function CardModal() {
  const { selectedCard, setSelectedCard, selectedIndex, setSelectedIndex, cards } = useCard();
  const [isFavorited, setIsFavorited] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeIndex = selectedIndex ?? 0;

  const setCardByIndex = (index: number) => {
    const nextIndex = (index + cards.length) % cards.length;
    setSelectedIndex(nextIndex);
    setIsFavorited(false);
  };

  const handleSwipeEnd = (clientX: number) => {
    if (dragStartX === null) return;

    const swipeDistance = clientX - dragStartX;

    if (swipeDistance < -45) {
      setCardByIndex(activeIndex + 1);
    }

    if (swipeDistance > 45) {
      setCardByIndex(activeIndex - 1);
    }

    setDragStartX(null);
  };

  useEffect(() => {
    if (!selectedCard) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCard(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setCardByIndex(activeIndex - 1);
        return;
      }

      if (event.key === "ArrowRight") {
        setCardByIndex(activeIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCard, activeIndex, cards.length]);

  if (!selectedCard) return null;

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setSelectedCard(null);
        }
      }}
    >
      <div className="relative mx-4 w-full max-w-3xl">
        <button
          type="button"
          onClick={() => setSelectedCard(null)}
          className="absolute -top-12 right-0 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20 hover:text-gray-200"
          aria-label="Close selected card"
        >
          <X className="h-7 w-7" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative w-full cursor-pointer rounded-[20px] bg-[#1F2121] p-4 transition-all duration-500 ease-out sm:p-5"
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
            }}
            onMouseMove={(event) => {
              if (!cardRef.current) return;

              const rect = cardRef.current.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 15;
              const rotateY = (centerX - x) / 15;

              cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={() => {
              if (!cardRef.current) return;

              cardRef.current.style.transition = "transform 0.5s ease-out";
              cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
            }}
          >
            <div
              className="relative mb-4 w-full cursor-grab touch-pan-y overflow-hidden rounded-[16px] active:cursor-grabbing"
              style={{ aspectRatio: "16 / 10" }}
              onPointerDown={(event) => {
                event.stopPropagation();
                setDragStartX(event.clientX);
              }}
              onPointerUp={(event) => {
                event.stopPropagation();
                handleSwipeEnd(event.clientX);
              }}
              onPointerCancel={() => setDragStartX(null)}
            >
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full bg-[#000000] object-contain"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl}
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/65">
                Swipe to change image
              </div>
            </div>

            <div className="mb-4 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#31b8c6]">
                Image {activeIndex + 1} of {cards.length}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {selectedCard.title}
              </h3>
            </div>

            <div className="flex gap-2">
              <a
                href={selectedCard.imageUrl}
                download
                className="inline-flex h-9 flex-1 items-center justify-center rounded-lg text-base font-medium text-black outline-none transition duration-300 ease-out hover:opacity-80 active:scale-[0.97]"
                style={{ backgroundColor: "#31b8c6" }}
              >
                <div className="flex items-center gap-1.5">
                  <Download className="h-4 w-4" strokeWidth={1.8} />
                  <span>Download</span>
                </div>
              </a>
              <button
                type="button"
                onClick={() => setIsFavorited((value) => !value)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-black outline-none transition duration-300 ease-out hover:opacity-80 active:scale-[0.97]"
                style={{ backgroundColor: "#31b8c6" }}
              >
                <Heart
                  className="h-4 w-4"
                  strokeWidth={1.8}
                  fill={isFavorited ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {cards.map((card, index) => (
                <button
                  type="button"
                  key={card.id}
                  onClick={(event) => {
                    event.stopPropagation();
                    setCardByIndex(index);
                  }}
                  onPointerDown={(event) => event.stopPropagation()}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border transition ${
                    index === activeIndex
                      ? "border-[#31b8c6] opacity-100"
                      : "border-white/10 opacity-55 hover:opacity-85"
                  }`}
                  aria-label={`Show ${card.title}`}
                >
                  <img
                    src={card.imageUrl}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardGalaxy() {
  const { cards } = useCard();

  const cardPositions = useMemo(() => {
    const positions: { x: number; y: number; z: number }[] = [];
    const numCards = cards.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let index = 0; index < numCards; index += 1) {
      const y = 1 - (index / Math.max(numCards - 1, 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * index) / goldenRatio;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const layerRadius = 10 + (index % 3) * 3.2;

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
      });
    }

    return positions;
  }, [cards]);

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.03} wireframe />
      </Sphere>
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.02} wireframe />
      </Sphere>

      {cards.map((card, index) => (
        <FloatingCard key={card.id} card={card} index={index} position={cardPositions[index]} />
      ))}
    </>
  );
}

interface StellarCardGalleryProps {
  cards: GalleryCard[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function StellarCardGallery({
  cards,
  title = "3D Stellar Card Gallery",
  subtitle = "Drag to look around • Scroll to zoom • Click cards to view details",
  className,
}: StellarCardGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedCard =
    selectedIndex === null ? null : cards[selectedIndex] ?? null;

  const setSelectedCard = (card: GalleryCard | null) => {
    if (!card) {
      setSelectedIndex(null);
      return;
    }

    const nextIndex = cards.findIndex((currentCard) => currentCard.id === card.id);
    setSelectedIndex(nextIndex >= 0 ? nextIndex : null);
  };

  return (
    <CardContext.Provider
      value={{ selectedCard, setSelectedCard, selectedIndex, setSelectedIndex, cards }}
    >
      <div
        className={`relative w-full overflow-hidden rounded-[1.7rem] bg-black ${className ?? ""}`}
      >
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto";
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <CardGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={5}
              maxDistance={40}
              autoRotate={false}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        <div className="pointer-events-none absolute left-4 top-4 z-20 text-white">
          <h3 className="mb-2 text-xl font-bold sm:text-2xl">{title}</h3>
          <p className="max-w-md text-xs opacity-70 sm:text-sm">{subtitle}</p>
        </div>
      </div>
    </CardContext.Provider>
  );
}
