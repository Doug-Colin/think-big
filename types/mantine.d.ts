import { Tuple } from '@mantine/core'

type CustomColors =
	| 'primary'
	| 'highlightPrimary'
	| 'highlightSecondary'
	| 'lowlight'
	| 'secondary'
	| 'dark'

declare module '@mantine/core' {
	export interface MantineThemeColorsOverride {
		colors: Record<CustomColors, Tuple<string, 10>>
	}
}
