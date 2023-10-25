import handlebars from "handlebars";
import handlebarsHelpers from "handlebars-helpers";

handlebarsHelpers(["string"], { handlebars });

export class Compiler {
  compile<ctx = Record<string, unknown>>(template: string, context: ctx) {
    const rawTemplate = handlebars.compile(template);
    const generated = rawTemplate(context);

    console.log(generated, "gen");

    return generated;
  }
}
