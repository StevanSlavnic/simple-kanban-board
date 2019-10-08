import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import classes from './Button.module.scss';

function ButtonUI(props) {
	const style = {
		height: props.size === 'large' ? '50px' : '32px',
		width: props.fullWidth ? '100%' : 'auto',
		borderWidth: '2px'
	};

	const sharedProps = {
		...props
	};

	const radiusClass = props.noradius ? classes.NoRadius : '';

	const inputBtnActiveClass = props.active ? classes.ButtonInputActive : '';

	const nohoverClass = props.nohover ? '' : classes['ButtonInput--icon_hover'];

	const fontSizeClass = props.size === 'large' ? classes.FontLarge : '';

	const outline = () => (
		<Button
			onClick={(e) => (props.onClick ? props.onClick(e) : null)}
			style={style}
			disabled={props.disabled}
			{...sharedProps}
			className={[ classes.ButtonBase, fontSizeClass, radiusClass, props.className ].join(
				' '
			)}
			variant="outlined"
			color={props.color ? props.color : 'primary'}>
			{props.loading ? progressLoader() : props.children}
		</Button>
	);

	const transparent = () => (
		<Button
			onClick={(e) => (props.onClick ? props.onClick(e) : null)}
			style={style}
			disabled={props.disabled}
			{...sharedProps}
			className={[
				classes.ButtonBase,
				classes.ButtonNormal,
				radiusClass,
				fontSizeClass,
				props.className
			].join(' ')}
			variant="transparent"
			color={props.color ? props.color : 'transparent'}>
			{props.loading ? progressLoader() : props.children}
		</Button>
	);

	const normal = () => (
		<Button
			onClick={(e) => (props.onClick ? props.onClick(e) : null)}
			style={style}
			disabled={props.disabled}
			{...sharedProps}
			className={[
				classes.ButtonBase,
				classes.ButtonNormal,
				radiusClass,
				fontSizeClass,
				props.className
			].join(' ')}
			variant="contained"
			color={props.color ? props.color : 'primary'}>
			{props.loading ? progressLoader() : props.children}
		</Button>
	);

	const input = () => (
		<Button
			onClick={(e) => (props.onClick ? props.onClick(e) : null)}
			style={style}
			disabled={props.disabled}
			{...sharedProps}
			className={[
				classes.ButtonBase,
				classes.ButtonInput,
				inputBtnActiveClass,
				nohoverClass,
				radiusClass,
				fontSizeClass,
				props.className
			].join(' ')}
			variant="outlined"
			color={props.color ? props.color : 'primary'}>
			{props.loading ? progressLoader() : props.children}
		</Button>
	);

	const link = () => (
		<Button
			onClick={(e) => (props.onClick ? props.onClick(e) : null)}
			style={style}
			disabled={props.disabled}
			{...sharedProps}
			className={[
				classes.ButtonBase,
				classes.ButtonLink,
				fontSizeClass,
				props.className
			].join(' ')}
			variant="outlined"
			color={props.color ? props.color : 'primary'}>
			{props.loading ? progressLoader() : props.children}
		</Button>
	);

	const progressLoader = () => {
		const size = props.size === 'large' ? '26px' : '22px'
		return (
				<CircularProgress
					className={classes.LoaderWrap}
					style={{ color: 'inherit', width: size, height: size}}
				/>
		);
	};

	const buttonMarkup = () => {
		switch (props.type) {
			case 'outline':
				return outline();
			case 'transparent':
				return transparent();
			case 'input':
				return input();
			case 'link':
				return link();
			default:
				return normal();
		}
	};
	return buttonMarkup();
}

export default React.memo(ButtonUI);
