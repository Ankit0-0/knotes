import { app } from "./app";
import dotenv from "dotenv";
import { PrismaService } from './config/prisma.config';

dotenv.config();

class Server {
    private readonly port : number | string;
    private serverInstance: any;
    private prisma: PrismaService;  

    constructor(port: number | string) {
        this.port = port;
        this.prisma = PrismaService.getInstance();
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
