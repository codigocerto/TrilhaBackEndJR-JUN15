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

// src/routes/index.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express4 = require("express");

// src/routes/user.routes/user.routes.ts
var import_express = require("express");

// src/infra/Http/adapters/ExpressRouterAdapter.ts
var ExpressRouterAdapter = class {
  static adapt(controller, method) {
    return (req, res) => __async(this, null, function* () {
      const httpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        query: req.query
      };
      yield controller[method](httpRequest, res);
    });
  }
};

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
      const user2 = yield prisma_default.user.create({
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
      return user2;
    });
  }
  findById(user_id) {
    return __async(this, null, function* () {
      if (user_id) {
        const user2 = yield prisma_default.user.findFirst({
          where: {
            id: user_id
          },
          select: {
            id: true,
            name: true,
            email: true
          }
        });
        return user2;
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

// src/controllers/user/UserController.ts
var UserController = class {
  constructor(userService2) {
    this.userService = userService2;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      const { name, email, password } = req.body;
      try {
        const user2 = yield this.userService.execute({ name, email, password });
        return HttpResponse.ok(res, user2);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          if (error.message === "EMAIL_INCORRECT" || error.message === "EMAIL_ALREADY_EXIST") {
            return HttpResponse.badRequest(res, error);
          } else {
            return HttpResponse.serverError(res);
          }
        } else {
          return HttpResponse.serverError(res);
        }
      }
    });
  }
  buscarPorEmail(req, res) {
    return __async(this, null, function* () {
      const user_id = req == null ? void 0 : req.user_id;
      const user2 = yield this.userService.findById(user_id);
      return res.json(user2);
    });
  }
  delete(req, res) {
    return __async(this, null, function* () {
      const user_id = req.query.user_id;
      if (!user_id) {
        return HttpResponse.badRequest(res, new Error("User ID is required"));
      }
      try {
        const removeUser = yield this.userService.delete({ user_id });
        if (removeUser) {
          return HttpResponse.ok(res, { message: "User deleted successfully" });
        } else {
          return HttpResponse.badRequest(res, new Error("User not found or could not be deleted"));
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

// src/routes/user.routes/user.routes.ts
var user = (0, import_express.Router)();
var userService = new UserService();
var userController = new UserController(userService);
user.post(
  "/v1/create",
  ExpressRouterAdapter.adapt(userController, "handle")
);
user.get(
  "/v1/me",
  isAuthenticated,
  (req, res) => userController.buscarPorEmail(req, res)
);
user.delete("/v1/remove", isAuthenticated, (req, res) => userController.delete(req, res));
var user_routes_default = user;

// src/routes/user.routes/auth.user.routes.ts
var import_express2 = require("express");

// src/services/user/AuthUserService.ts
var import_bcryptjs2 = require("bcryptjs");
var import_jsonwebtoken2 = require("jsonwebtoken");
var AuthUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ email, password }) {
      if (!email) {
        throw new Error("Email precisa ser enviado");
      }
      if (!password) {
        throw new Error("Password precisa ser enviado");
      }
      const user2 = yield prisma_default.user.findFirst({
        where: {
          email
        }
      });
      if (!user2) {
        throw new Error("Nome de usu\xE1rio ou senha errados!");
      }
      const passwordMatch = yield (0, import_bcryptjs2.compare)(password, user2 == null ? void 0 : user2.password);
      if (!passwordMatch) {
        throw new Error("Senha incorreta");
      }
      const token = (0, import_jsonwebtoken2.sign)(
        {
          name: user2 == null ? void 0 : user2.name,
          email: user2 == null ? void 0 : user2.email
        },
        process.env.JWT_SECRET,
        {
          subject: user2 == null ? void 0 : user2.id,
          expiresIn: "30d"
        }
      );
      return {
        id: user2 == null ? void 0 : user2.id,
        name: user2 == null ? void 0 : user2.name,
        email: user2 == null ? void 0 : user2.email,
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
      const auth2 = yield authUserService.execute({
        email,
        password
      });
      return response.json(auth2);
    });
  }
};

// src/routes/user.routes/auth.user.routes.ts
var auth = (0, import_express2.Router)();
auth.post("/v1/session", new AuthUserController().handle);
var auth_user_routes_default = auth;

// src/routes/task.routes/task.routes.ts
var import_express3 = require("express");

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
var task = (0, import_express3.Router)();
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

// src/routes/index.ts
var routes = (0, import_express4.Router)();
routes.use("/user", user_routes_default);
routes.use("/auth", auth_user_routes_default);
routes.use("/task", task_routes_default);
routes.use("/", (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Okay",
    timestamp: Date.now()
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    if (error instanceof Error) {
      healthcheck.message = error.message;
    } else {
      healthcheck.message = "An unknown error occurred";
    }
    res.status(503).send(healthcheck);
  }
});
routes.get("/terms", (req, res) => {
  return res.json({
    message: "Termos de servi\xE7o"
  });
});
var routes_default = routes;
