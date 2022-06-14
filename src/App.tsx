import './App.css';
import React, { Suspense, useMemo, useState } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { CameraShake, Environment, OrbitControls, TrackballControls } from '@react-three/drei';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import CartridgeModel from './Components/Models/CartridgeModel';
import { EffectComposer } from '@react-three/postprocessing';

export enum Cartridge {
    GOLD,
    SILVER,
    RAINBOW,
    _ /** Null cartridge */
}

const hdrMaps: { [p: number]: string } = {
    [Cartridge.GOLD]: '/assets/models/zloty/zloty.hdr',
    [Cartridge.SILVER]: '/assets/models/szary/szary.hdr',
    [Cartridge.RAINBOW]: '/assets/models/teczowy/teczowy.hdr',
    [Cartridge._]: '/assets/models/pusty/pusty.hdr'
};

extend({ RenderPass });

function App() {
    /** TODO: Expose `setCartridge` */
    const [cartridge, setCartridge] = useState(Cartridge._);

    const isLoading = useMemo(() => cartridge === Cartridge._, [cartridge]);

    return (
        <div className="canvas-container" style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ color: 'white', position: 'absolute', top: '0', left: '0', zIndex: '1' }}>_set cartridge
                <div onClick={() => setCartridge(Cartridge.GOLD)}>gold</div>
                <div onClick={() => setCartridge(Cartridge.RAINBOW)}>rainbow</div>
                <div onClick={() => setCartridge(Cartridge.SILVER)}>silver</div>
                <div onClick={() => setCartridge(Cartridge._)}>null</div>
            </div>

            <Canvas camera={{ position: [1.5, 0.5, 1], fov: 60 }}>
                <Suspense fallback={null}>
                    <CartridgeModel cartridge={cartridge} />
                    <Environment files={hdrMaps[cartridge]} />
                    {!isLoading || <ambientLight />}

                    <OrbitControls makeDefault autoRotate autoRotateSpeed={1} enablePan={false} enableZoom={false} />
                    {/** Zoom control */}
                    <TrackballControls noRotate={true} noPan={true} noZoom={false} zoomSpeed={1.5} />
                    <CameraShake maxRoll={0.05} maxPitch={0.05} maxYaw={0.05} />

                    <EffectComposer>
                        {/*<SSAO />*/}
                        {/*<Bloom luminanceThreshold={.5} kernelSize={5}/>*/}
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;
