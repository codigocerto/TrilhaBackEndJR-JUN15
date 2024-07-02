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

// src/controllers/user/UserController.ts
var UserController_exports = {};
__export(UserController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(UserController_exports);

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
  constructor(userService) {
    this.userService = userService;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      const { name, email, password } = req.body;
      try {
        const user = yield this.userService.execute({ name, email, password });
        return HttpResponse.ok(res, user);
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
      const user = yield this.userService.findById(user_id);
      return res.json(user);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});
