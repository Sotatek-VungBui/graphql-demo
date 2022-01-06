import BookController from "@controller/BookController";
import AuthorController from "@controller/AuthorController";
import UserController from "@controller/UserController";
import AuthController from "@controller/AuthController";

const mongoDataMethods = {
    ...BookController,
    ...AuthorController,
    ...UserController,
    ...AuthController
};

export default mongoDataMethods;