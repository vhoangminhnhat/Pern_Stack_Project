import mountRouters from "./routes";

const app = mountRouters();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening from ${PORT}`);
});
