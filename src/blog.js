import express from "express";
import { ExpressHandlebars } from "express-handlebars";

const app = express();

app.use(ExpressHandlebars());

app.get("/", (req, res) => {
    res.render("index", {
        title: "My Website",
    });
    }
);