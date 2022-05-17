import React, { Suspense, useEffect } from 'react';
import { useFBX, useTexture } from '@react-three/drei';
import { Mesh, MeshPhongMaterial } from 'three';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export const TestModel = () => {
	const model = useFBX('/assets/model2/source/amber.fbx')

	const texture = {
		amber: {
			color: useTexture('/assets/model2/source/basecolor2.jpg'),
			normals: useTexture('/assets/model2/source/normals_exporthr.png'),
			roughness: useTexture('/assets/model2/source/roughness.jpg')
		},
		insect: {
			color: useTexture('/assets/model2/source/color.jpg'),
			normals: useTexture('/assets/model2/source/normals.jpg')
		},
		noise: {
			ao: useTexture('/assets/model2/source/internal_ground_ao_texture.jpeg')
		}
	};

	useEffect(() => {
		model.traverse((node) => {
			console.log('current:', node);
			const materialRef = ((node as Mesh).material as MeshPhongMaterial);

			if (node.name === '5_amber_lr') {
				materialRef.map = texture.amber.color;
				materialRef.normalMap = texture.amber.normals;
				materialRef.bumpMap = texture.amber.roughness;

				materialRef.normalMapType = THREE.ObjectSpaceNormalMap
			}

			if (node.name === '2_mosquito_lr') {
				materialRef.map = texture.insect.color;
				materialRef.normalMap = texture.insect.normals;

				materialRef.normalMapType = THREE.ObjectSpaceNormalMap
			}

			if (node.name === '6_eclats') {
				materialRef.map = texture.insect.color;
				materialRef.aoMap = texture.noise.ao;
			}
		});
	}, [model]);

	return (
		<Suspense fallback={null}>
			<primitive object={model} />
		</Suspense>
	);
};
