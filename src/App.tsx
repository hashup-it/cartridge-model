import './App.css';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, CameraShake, Environment } from '@react-three/drei';
import Model from './Components/Models/Model';

function App() {
	return (
		<div className="canvas-container">
			<Canvas camera={{position: [-200, 0, 150], fov: 30}}>
				<Suspense fallback={null}>
					<Model />
					<Environment preset="sunset" background />

					<OrbitControls makeDefault autoRotate autoRotateSpeed={1} />
					<CameraShake maxRoll={0.05} maxPitch={0.05} maxYaw={0.05} />
				</Suspense>
			</Canvas>
		</div>
	);
}

export default App;
