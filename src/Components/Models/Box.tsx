import React from 'react';

export const Box = (props: JSX.IntrinsicElements['mesh']) => (
	<mesh
		{...props}>
		<boxGeometry args={[1, 1, 1]} />
		<meshStandardMaterial color={'hotpink'} />
	</mesh>
);
