import { FC, useEffect, useState } from 'react';

interface Props {
	color: string;
	image: string;
	fov: number
}


export const CartridgeModel: FC<Props> = ({ color, image, fov}) => {
	const [framePath, setFramePath] = useState<string>(`${window.location.protocol}//${window.location.host}/cartridgeModel/`);

	useEffect(() => {
		const path = `${window.location.protocol}//${window.location.host}/cartridgeModel/?qsfov=40&qscolor=${color}&qsimage=${image}`;
		setFramePath(path);
	}, [color, image]);

	return (
		<iframe title="cartridge model" src={framePath} width="400px" height="300px" />
	);
};
