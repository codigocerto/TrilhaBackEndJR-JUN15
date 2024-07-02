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

// src/services/task/TaskService.ts
var TaskService_exports = {};
__export(TaskService_exports, {
  TaskService: () => TaskService
});
module.exports = __toCommonJS(TaskService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/services/task/TaskService.ts
var TaskService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ title, description, userId }) {
      const task = yield prisma_default.task.create({
        data: {
          title,
          description,
          userId
        }
      });
      return task;
    });
  }
  update(_0) {
    return __async(this, arguments, function* ({ title, description, userId }) {
      const dataToUpdate = {};
      if (title !== void 0 && title !== "") {
        dataToUpdate.title = title;
      }
      if (description !== void 0 && description !== "") {
        dataToUpdate.description = description;
      }
      const taskEdited = yield prisma_default.task.update({
        where: {
          id: userId
        },
        data: dataToUpdate
      });
      return taskEdited;
    });
  }
  listTaskById(_0) {
    return __async(this, arguments, function* ({ userId }) {
      const findListTaskById = yield prisma_default.task.findMany({
        where: {
          userId
        }
      });
      return findListTaskById;
    });
  }
  delete(_0) {
    return __async(this, arguments, function* ({ userId }) {
      if (!userId) {
        throw new Error("User ID is required");
      }
      try {
        const removedTask = yield prisma_default.task.delete({
          where: {
            id: userId
          }
        });
        if (removedTask) {
          return { message: "Task deleted successfully" };
        } else {
          throw new Error("Task not found or could not be deleted");
        }
      } catch (error) {
        console.error("Error deleting Task:", error);
        throw error;
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaskService
});
