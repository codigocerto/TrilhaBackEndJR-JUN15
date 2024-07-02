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

// src/services/user/UserService.ts
var UserService_exports = {};
__export(UserService_exports, {
  UserService: () => UserService
});
module.exports = __toCommonJS(UserService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/services/user/UserService.ts
var import_bcryptjs = require("bcryptjs");
var UserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ name, email, password }) {
      if (!email) {
        throw new Error("EMAIL_INCORRECT");
      }
      const userAlreadyExist = yield prisma_default.user.findFirst({
        where: {
          email
        }
      });
      if (userAlreadyExist) {
        throw new Error("EMAIL_ALREADY_EXIST");
      }
      const passwordHas = yield (0, import_bcryptjs.hash)(password, 8);
      const user = yield prisma_default.user.create({
        data: {
          name,
          email,
          password: passwordHas
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      });
      return user;
    });
  }
  findById(user_id) {
    return __async(this, null, function* () {
      if (user_id) {
        const user = yield prisma_default.user.findFirst({
          where: {
            id: user_id
          },
          select: {
            id: true,
            name: true,
            email: true
          }
        });
        return user;
      }
    });
  }
  delete(_0) {
    return __async(this, arguments, function* ({ user_id }) {
      if (!user_id) {
        throw new Error("User ID is required");
      }
      try {
        const removedUser = yield prisma_default.user.delete({
          where: {
            id: user_id
          }
        });
        if (removedUser) {
          return { message: "User deleted successfully" };
        } else {
          throw new Error("User not found or could not be deleted");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserService
});
