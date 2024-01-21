import esbuild from "esbuild";
import ts from "typescript";
import path from "path";

export async function build({
  fileName,
  directory,
}: {
  fileName: string;
  directory: string;
}) {
  const filename = path.normalize(path.join(directory, fileName));
  const tsFileName = `${filename}.tsx`;
  const jsFileName = `${filename}.js`;

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.React,
    declaration: true,
    emitDeclarationOnly: true,
    outDir: directory,
    incremental: true,
  };

  const bundle = await esbuild.build({
    entryPoints: [tsFileName],
    bundle: true,
    outfile: jsFileName,
    loader: {
      ".tsx": "tsx",
      ".jsx": "jsx",
      ".ts": "ts",
      ".js": "js",
    },
    format: "esm",
    jsx: "automatic",
    packages: "external",
    minify: true,
  });

  const program = ts.createProgram([tsFileName], compilerOptions);
  program.emit();

  return bundle;
}
