import Web3 from 'web3';
import configuration from '../build/contracts/Tickets.json';
import 'bootstrap/dist/css/bootstrap.css';
import ticketImage from './images/Evidence.png';

const createElementFromString = (string) => {
  const el = document.createElement('div');
  el.innerHTML = string;
  return el.firstChild;
};

const CONTRACT_ADDRESS =
  configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
  Web3.givenProvider || 'http://127.0.0.1:7545'
);
const contract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);

let account;

const accountEl = document.getElementById('account');
const ticketsEl = document.getElementById('tickets');
const TOTAL_TICKETS = 10;
const EMPTY_ADDRESS =
  '0x0000000000000000000000000000000000000000';

const buyTicket = async (ticket) => {
  await contract.methods
    .buyTicket(ticket.id)
    .send({ from: account, value: ticket.price });
};

const refreshTickets = async () => {
  ticketsEl.innerHTML = '';
  for (let i = 0; i < TOTAL_TICKETS; i++) {
    const ticket = await contract.methods.tickets(i).call();
    ticket.id = i;
    if (ticket.owner === EMPTY_ADDRESS) {
      const ticketEl = createElementFromString(
        `<div class="ticket card" style="width: 18rem;">
          <img src="${ticketImage}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Evidence ${i}</h5>
            <p class="card-text">Storing Cost: ${
              ticket.price / 1e18
            } Eth</p>
            <button class="btn btn-primary">Upload</button>
          </div>
        </div>`
      );
      ticketEl.onclick = buyTicket.bind(null, ticket);
      ticketsEl.appendChild(ticketEl);
    }
  }
};
function displaySysInfo(){
    const os = require('os');
    ptfm = os.platform();
    architecture = os.arch();
    cpu_usage = os.cpus();
    mem_in_use = os.totalmem()-os.freemem();
    working_directory = os.homedir();

    console.log("Sytem Resource Information");
    console.log("Current Platform: ",ptfm);
    console.log("Architecture: ",architecture);
    console.log("CPU Usage: ", cpu_usage);
    console.log("Memory in-use: ", mem_in_use, "bytes");
}

const main = async () => {
  const accounts = await web3.eth.requestAccounts();
  console.log(accounts);
  account = accounts[0];
  accountEl.innerText = account;
  displaySysInfo();
  await refreshTickets();
};

main();