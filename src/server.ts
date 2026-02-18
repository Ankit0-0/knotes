import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

class Server {
    private readonly port : number | string;
    private serverInstance: any;

    constructor(port: number | string) {
        this.port = port;
    }

    public start() : void {
    this.serverInstance = app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });

    }
};


// Initialize and start the server
const PORT = Number(process.env.PORT) || 4000;
const server = new Server(PORT);
server.start();
