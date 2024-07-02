var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/controllers/user/AuthUserController.ts
var AuthUserController_exports = {};
__export(AuthUserController_exports, {
  AuthUserController: () => AuthUserController
});
module.exports = __toCommonJS(AuthUserController_exports);

// src/services/user/AuthUserService.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");

// src/prisma/index.ts
var import_client = require("@prisma/client");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/services/user/AuthUserService.ts
var AuthUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ email, password }) {
      if (!email) {
        throw new Error("Email precisa ser enviado");
      }
      if (!password) {
        throw new Error("Password precisa ser enviado");
      }
      const user = yield prisma_default.user.findFirst({
        where: {
          email
        }
      });
      if (!user) {
        throw new Error("Nome de usu\xE1rio ou senha errados!");
      }
      const passwordMatch = yield (0, import_bcryptjs.compare)(password, user == null ? void 0 : user.password);
      if (!passwordMatch) {
        throw new Error("Senha incorreta");
      }
      const token = (0, import_jsonwebtoken.sign)(
        {
          name: user == null ? void 0 : user.name,
          email: user == null ? void 0 : user.email
        },
        process.env.JWT_SECRET,
        {
          subject: user == null ? void 0 : user.id,
          expiresIn: "30d"
        }
      );
      return {
        id: user == null ? void 0 : user.id,
        name: user == null ? void 0 : user.name,
        email: user == null ? void 0 : user.email,
        toke: token
      };
    });
  }
};

// src/controllers/user/AuthUserController.ts
var AuthUserController = class {
  handle(request, response) {
    return __async(this, null, function* () {
      const { email, password } = request.body;
      const authUserService = new AuthUserService();
      const auth = yield authUserService.execute({
        email,
        password
      });
      return response.json(auth);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthUserController
});
