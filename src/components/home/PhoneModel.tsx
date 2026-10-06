import { Zap, Battery, Cpu, AlertTriangle, Lock, Flashlight, Camera, Phone, MessageCircle, Compass, Settings, Image as ImageIcon, Map, Mail, Calendar } from "lucide-react";

export default function PhoneModel({ isDestroyed }: { isDestroyed: boolean; p: number }) {
  const chassisThickness = 16;
  const chassisLayers = Array.from({ length: chassisThickness });

  return (
    <div className="phone-pivot w-full h-full relative preserve-3d">
      {/* Glow central */}
      <div className="core-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-blue-500/20 blur-[clamp(1.875rem,10vw,6.25rem)] rounded-full pointer-events-none opacity-0 preserve-3d" />

      {/* Capa trasera */}
      <div className="layer-back absolute inset-0 w-full h-full preserve-3d rounded-[clamp(1.5rem,8vw,3rem)] bg-gradient-to-br from-zinc-800 to-black border-[0.5px] border-zinc-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(4rem,20vw,7rem)] h-[clamp(4rem,20vw,7rem)] rounded-full border-[clamp(0.1875rem,1vw,0.5rem)] border-zinc-700/80 bg-black/40 flex items-center justify-center shadow-inner">
          <div className="w-[clamp(2.5rem,12vw,4rem)] h-[clamp(2.5rem,12vw,4rem)] rounded-full border-4 border-dashed border-blue-500/50 flex items-center justify-center animate-[spin_10s_linear_infinite]">
            <Zap className="text-blue-400 w-[clamp(1rem,4vw,1.5rem)] h-[clamp(1rem,4vw,1.5rem)]" />
          </div>
        </div>
      </div>

      {/* Capa del chasis (capas 3D) */}
      <div className="layer-chassis absolute inset-0 preserve-3d">
        {chassisLayers.map((_, i) => (
          <div
            key={i}
            className={`absolute inset-0 rounded-[clamp(1.5rem,8vw,3rem)] border border-zinc-400/30 ${
              i === 0 || i === chassisThickness - 1 ? "bg-zinc-900/90" : "bg-transparent shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"
            }`}
            style={{
              transform: `translateZ(${-i * 0.09375}rem)`,
              borderColor: i % 2 === 0 ? "rgba(161, 161, 170, 0.4)" : "rgba(113, 113, 122, 0.2)",
            }}
          />
        ))}
        {/* Botones laterales */}
        <div className="absolute left-[-0.25rem] top-[20%] w-[0.25rem] h-[clamp(2rem,8vw,3rem)] bg-zinc-400 rounded-l-md" style={{ transform: "translateZ(-0.625rem)" }} />
        <div className="absolute left-[-0.25rem] top-[30%] w-[0.25rem] h-[clamp(2rem,8vw,3rem)] bg-zinc-400 rounded-l-md" style={{ transform: "translateZ(-0.625rem)" }} />
        <div className="absolute right-[-0.25rem] top-[25%] w-[0.25rem] h-[clamp(3rem,10vw,4rem)] bg-zinc-400 rounded-r-md" style={{ transform: "translateZ(-0.625rem)" }} />
      </div>

      {/* Capa inferior (conector, altavoz) */}
      <div className="layer-bottom absolute inset-0 preserve-3d">
        <div className="absolute bottom-[clamp(0.5rem,5%,1.25rem)] left-1/2 -translate-x-1/2 w-[85%] h-[clamp(3rem,15vw,5rem)] flex justify-between items-end gap-2">
          <div className="w-[clamp(2rem,10vw,3rem)] h-[clamp(3rem,15vw,4rem)] bg-gradient-to-t from-zinc-900 to-zinc-800 rounded-md border border-zinc-600 shadow-xl flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#444_2px,#444_4px)] opacity-30" />
            <span className="text-[clamp(0.3125rem,2vw,0.4375rem)] font-tech text-zinc-400 -rotate-90 z-10 bg-zinc-900 px-1">TAPTIC</span>
          </div>
          <div className="flex-1 h-[clamp(2rem,8vw,3rem)] bg-zinc-800/90 rounded-md border border-zinc-600 backdrop-blur-md flex items-center justify-center">
            <div className="w-1/2 h-[clamp(0.125rem,1vw,0.25rem)] bg-black rounded-full shadow-inner" />
          </div>
        </div>
      </div>

      {/* Batería (lateral derecho) */}
      <div className="layer-battery absolute top-[15%] right-[6%] w-[45%] h-[58%] preserve-3d bg-[#111] rounded-lg border-2 border-zinc-700 shadow-2xl p-[clamp(0.5rem,2%,0.75rem)] flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        <div className="flex justify-between items-center border-b border-zinc-800 pb-[2px]">
          <span className="text-[clamp(0.375rem,2vw,0.5rem)] text-zinc-400 font-tech">Graphene Cell</span>
          <Battery className="w-[clamp(0.8rem,3vw,1rem)] h-[clamp(0.8rem,3vw,1rem)] text-emerald-500" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white font-display text-[clamp(0.7rem,3vw,0.9rem)] font-bold tracking-widest opacity-90">PK-PRO</div>
            <div className="text-[clamp(0.5rem,2.5vw,0.625rem)] text-emerald-400 font-tech mt-1">100% HEALTH</div>
          </div>
        </div>
        <div className="text-[clamp(0.3125rem,1.8vw,0.375rem)] text-zinc-500 font-mono leading-tight text-justify">
          CAUTION: DO NOT PUNCTURE OR INCINERATE. AUTHORIZED PERSONNEL ONLY.
        </div>
      </div>

      {/* Placa base (esquina inferior izquierda) */}
      <div
        className="layer-board absolute top-[6%] left-[6%] w-[48%] h-[50%] bg-[#0f1115] border border-blue-900/50 rounded-lg shadow-2xl overflow-hidden flex flex-col items-center pt-[clamp(1rem,6%,2rem)] preserve-3d"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)" }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative w-[clamp(2.5rem,15vw,4rem)] h-[clamp(2.5rem,15vw,4rem)] bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-md border-2 border-zinc-500 shadow-[0_0_15px_rgba(0,0,0,1)] flex flex-col items-center justify-center z-10">
          <Cpu className="text-zinc-400 w-[clamp(1rem,4vw,1.25rem)] h-[clamp(1rem,4vw,1.25rem)] mb-1 opacity-50" />
          <span className="text-[clamp(0.5rem,2.5vw,0.625rem)] text-white font-bold font-display tracking-widest">M4</span>
        </div>
        <div className="absolute bottom-4 left-4 flex gap-1">
          <div className="w-[clamp(0.1875rem,1vw,0.25rem)] h-[clamp(0.25rem,1.5vw,0.375rem)] bg-amber-600 rounded-sm" />
          <div className="w-[clamp(0.1875rem,1vw,0.25rem)] h-[clamp(0.25rem,1.5vw,0.375rem)] bg-amber-600 rounded-sm" />
          <div className="w-[clamp(0.1875rem,1vw,0.25rem)] h-[clamp(0.1875rem,1vw,0.25rem)] bg-zinc-400 rounded-sm" />
        </div>
      </div>

      {/* Pantalla (capa frontal) */}
      <div className="layer-screen absolute inset-0 preserve-3d rounded-[clamp(1.5rem,7vw,2.8rem)] bg-black border-[clamp(0.125rem,1vw,0.25rem)] border-zinc-800 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="glass-reflection absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none z-30" />
        
        {/* Notch / Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[clamp(3rem,20%,6rem)] h-[clamp(1rem,4%,1.5rem)] bg-zinc-950 rounded-full border border-zinc-800 flex items-center justify-between px-2 z-40">
          <div className="w-[clamp(0.25rem,1vw,0.375rem)] h-[clamp(0.25rem,1vw,0.375rem)] rounded-full bg-blue-900/50" />
          <div className="w-[clamp(0.25rem,1vw,0.375rem)] h-[clamp(0.25rem,1vw,0.375rem)] rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
        </div>

        {isDestroyed ? (
          <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center z-10">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#ef4444_1px,transparent_1px)] bg-[size:10px_10px]" />
            <AlertTriangle className="text-red-500 w-[clamp(3rem,15vw,4rem)] h-[clamp(3rem,15vw,4rem)] mb-4 animate-bounce shadow-red-500 drop-shadow-2xl" />
            <div className="font-display text-red-500 text-[clamp(1.2rem,6vw,2rem)] tracking-widest font-bold">CRITICAL</div>
            <div className="text-red-400 font-tech text-[clamp(0.5rem,3vw,0.75rem)] mt-2 border border-red-500/50 p-1 bg-red-900/30">SYSTEM FAILURE</div>
          </div>
        ) : (
          <div className="absolute inset-0 z-10 bg-black overflow-hidden rounded-[inherit]">
            
            {/* HOME SCREEN (Pantalla de inicio) */}
            <div className="home-screen absolute inset-0 bg-zinc-300 z-10 flex flex-col justify-between pt-10 pb-4 px-3 overflow-hidden">
              {/* Puedes reemplazar bg-zinc-300 por tu imagen: bg-[url('/tu-imagen-fondo.jpg')] bg-cover bg-center */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
              
              {/* Grid de Apps */}
              <div className="grid grid-cols-4 gap-y-4 gap-x-2 z-10 mt-4">
                {[
                  { icon: <MessageCircle size="1.125rem" className="text-white"/>, color: "bg-green-500" },
                  { icon: <Calendar size="1.125rem" className="text-red-500"/>, color: "bg-white" },
                  { icon: <ImageIcon size="1.125rem" className="text-white"/>, color: "bg-blue-400" },
                  { icon: <Camera size="1.125rem" className="text-white"/>, color: "bg-zinc-300" },
                  { icon: <Map size="1.125rem" className="text-white"/>, color: "bg-green-600" },
                  { icon: <Mail size="1.125rem" className="text-white"/>, color: "bg-blue-500" },
                  { icon: <Settings size="1.125rem" className="text-white"/>, color: "bg-zinc-700" },
                  { icon: <Compass size="1.125rem" className="text-blue-500"/>, color: "bg-white" },
                ].map((app, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-[clamp(2rem,10vw,2.8rem)] h-[clamp(2rem,10vw,2.8rem)] rounded-xl flex items-center justify-center shadow-sm ${app.color}`}>
                      {app.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dock Inferior */}
              <div className="w-full h-[clamp(3.5rem,15vw,4.5rem)] bg-white/30 backdrop-blur-xl rounded-3xl z-10 flex items-center justify-around px-2 border border-white/20">
                {[
                  { icon: <Phone size="1.25rem" className="text-white"/>, color: "bg-green-500" },
                  { icon: <Compass size="1.25rem" className="text-blue-500"/>, color: "bg-white" },
                  { icon: <MessageCircle size="1.25rem" className="text-white"/>, color: "bg-green-400" },
                  { icon: <Settings size="1.25rem" className="text-blue-500"/>, color: "bg-blue-400" },
                ].map((dockApp, i) => (
                  <div key={i} className={`w-[clamp(2.2rem,11vw,3rem)] h-[clamp(2.2rem,11vw,3rem)] rounded-xl flex items-center justify-center shadow-md ${dockApp.color}`}>
                    {dockApp.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* LOCK SCREEN (Pantalla de bloqueo) - Se superpone sobre el Home y se desvanece */}
            <div className="lock-screen absolute inset-0 bg-blue-500 z-20 flex flex-col items-center justify-between pb-6 pt-12 px-5">
              {/* Puedes reemplazar bg-blue-500 por tu imagen: bg-[url('/tu-coche-rojo.jpg')] bg-cover bg-center */}
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              
              <div className="flex flex-col items-center z-10 w-full mt-2">
                <Lock className="text-white w-4 h-4 mb-1" />
                <span className="text-white/90 text-[clamp(0.625rem,3vw,0.875rem)] font-medium tracking-wide">Tue Apr 1</span>
                <span className="text-white text-[clamp(4rem,20vw,5.5rem)] font-light leading-none tracking-tighter mt-[-0.3125rem]">9:41</span>
              </div>

              <div className="flex justify-between w-full z-10 mb-2">
                <div className="w-[clamp(2.5rem,10vw,3rem)] h-[clamp(2.5rem,10vw,3rem)] rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/10">
                  <Flashlight className="text-white w-[clamp(1rem,4vw,1.2rem)] h-[clamp(1rem,4vw,1.2rem)]" />
                </div>
                <div className="w-[clamp(2.5rem,10vw,3rem)] h-[clamp(2.5rem,10vw,3rem)] rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/10">
                  <Camera className="text-white w-[clamp(1rem,4vw,1.2rem)] h-[clamp(1rem,4vw,1.2rem)]" />
                </div>
              </div>
              
              {/* Barra inferior (Home indicator) */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-[0.25rem] bg-white rounded-full z-10" />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}