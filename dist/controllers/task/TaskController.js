var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/controllers/task/TaskController.ts
var TaskController_exports = {};
__export(TaskController_exports, {
  TaskController: () => TaskController
});
module.exports = __toCommonJS(TaskController_exports);

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
  constructor(taskService) {
    this.taskService = taskService;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      const { title, description, userId } = req.body;
      try {
        const task = yield this.taskService.execute({
          title,
          description,
          userId
        });
        return res.json(task);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaskController
});
