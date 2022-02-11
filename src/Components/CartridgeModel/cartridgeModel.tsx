import { FC, useEffect, useState } from 'react';

interface Props {
	color: string;
	image: string;
	fov: number,
	width: string,
	height: string
}


export const CartridgeModel: FC<Props> = ({ color, image, fov, width, height}) => {
	const [framePath, setFramePath] = useState<string>(``);

	useEffect(() => {
		const path = `${window.location.protocol}//${window.location.host}/cartridgeModel/?qsfov=${fov}&qscolor=${color}&qsimage=${image}`;
		setFramePath(path);
	}, [color, image, fov]);

	return (
		<iframe title="cartridge model" src={framePath} width={width} height={height} />
	);
};
