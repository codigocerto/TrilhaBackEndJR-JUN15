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

// src/routes/task.routes/task.routes.ts
var task_routes_exports = {};
__export(task_routes_exports, {
  default: () => task_routes_default
});
module.exports = __toCommonJS(task_routes_exports);
var import_express = require("express");

// src/middlewares/isAuthenticated.ts
var import_jsonwebtoken = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    const { sub } = (0, import_jsonwebtoken.verify)(token, process.env.JWT_SECRET);
    req.user_id = sub;
    return next();
  } catch (error) {
    return res.status(401).end();
  }
}

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
      const task2 = yield prisma_default.task.create({
        data: {
          title,
          description,
          userId
        }
      });
      return task2;
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

// src/infra/helper/HttpResponse.ts
var HttpResponse = class {
  static ok(res, data) {
    res.status(200).json(data);
    return { status: 200, data };
  }
  static badRequest(res, error) {
    const errorMessage = { error: error.message };
    res.status(400).json(errorMessage);
    return { status: 400, data: errorMessage };
  }
  static serverError(res) {
    const errorMessage = { status: "error", message: "Internal server error." };
    res.status(500).json(errorMessage);
    return { status: 500, data: errorMessage };
  }
};

// src/controllers/task/TaskController.ts
var TaskController = class {
  constructor(taskService2) {
    this.taskService = taskService2;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      const { title, description, userId } = req.body;
      try {
        const task2 = yield this.taskService.execute({
          title,
          description,
          userId
        });
        return res.json(task2);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return HttpResponse.serverError(res);
        }
        return HttpResponse.serverError(res);
      }
    });
  }
  update(req, res) {
    return __async(this, null, function* () {
      const { title, description, userId } = req.body;
      try {
        const taskEdited = yield this.taskService.update({
          title,
          description,
          userId
        });
        return res.json(taskEdited);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return HttpResponse.serverError(res);
        }
        return HttpResponse.serverError(res);
      }
    });
  }
  listar(req, res) {
    return __async(this, null, function* () {
      const userId = req.params.userId;
      try {
        const tasks = yield this.taskService.listTaskById({
          userId
        });
        return res.json(tasks);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return HttpResponse.serverError(res);
        }
        return HttpResponse.serverError(res);
      }
    });
  }
  delete(req, res) {
    return __async(this, null, function* () {
      const userId = req.query.userId;
      if (!userId) {
        return HttpResponse.badRequest(res, new Error("User ID is required"));
      }
      try {
        const removeTask = yield this.taskService.delete({ userId });
        if (removeTask) {
          return HttpResponse.ok(res, { message: "Task deleted successfully" });
        } else {
          return HttpResponse.badRequest(res, new Error("Task not found or could not be deleted"));
        }
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return HttpResponse.serverError(res);
        }
        return HttpResponse.serverError(res);
      }
    });
  }
};

// src/routes/task.routes/task.routes.ts
var task = (0, import_express.Router)();
var taskService = new TaskService();
var taskController = new TaskController(taskService);
task.post(
  "/v1/create",
  isAuthenticated,
  (req, res) => taskController.handle(req, res)
);
task.put(
  "/v1/editTask",
  isAuthenticated,
  (req, res) => taskController.update(req, res)
);
task.get(
  "/v1/tasks",
  isAuthenticated,
  (req, res) => taskController.listar(req, res)
);
task.delete("/v1/remove", isAuthenticated, (req, res) => taskController.delete(req, res));
var task_routes_default = task;
