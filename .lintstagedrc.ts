import path from 'path'

const buildEslintCommand = (filenames: string[]): string =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

export const commands = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
}
