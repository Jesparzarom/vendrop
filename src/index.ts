import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { minify } from "terser";
import path from "path";
import chalk from 'chalk';
import ora from 'ora';
import type { Plugin } from 'vite';

export interface VendorEntry {
  src: string;
  out: string;
}

export async function bundle(vendor: VendorEntry): Promise<void> {
  const inputPath = path.resolve(vendor.src);
  const outputPath = path.resolve(vendor.out);
  const outputDir = path.dirname(outputPath);

  console.log(chalk.cyan('\n  🚀 Preparing for launch...\n'));

  const spinner1 = ora({ text: 'Reading source', color: 'cyan' }).start();
  const code = readFileSync(inputPath, "utf-8");
  spinner1.succeed(chalk.green('Reading source'));

  const spinner2 = ora({ text: 'Minifying payload', color: 'cyan' }).start();
  const result = await minify(code, { compress: true, mangle: true });
  spinner2.succeed(chalk.green('Minifying payload'));

  const spinner3 = ora({ text: 'Deploying to vendor', color: 'cyan' }).start();
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, result.code!);
  spinner3.succeed(chalk.green('Deploying to vendor'));

  console.log(chalk.cyan('\n  ✦ Deployed. Ready for liftoff.\n'));
}

export function vendropVite(vendors: VendorEntry[]): Plugin {
  return {
    name: 'vendrop',
    buildStart: async () => {
      for (const vendor of vendors) await bundle(vendor);
    },
    configureServer: async () => {
      for (const vendor of vendors) await bundle(vendor);
    }
  }
}