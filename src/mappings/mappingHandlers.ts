import { ExecuteEvent, Message } from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";

/*
export async function handleBlock(block: CosmosBlock): Promise<void> {
  // If you want to index each block in Cosmos (CosmosHub), you could do that here
}
*/

/*
export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  // If you want to index each transaction in Cosmos (CosmosHub), you could do that here
  const transactionRecord = Transaction.create({
    id: tx.hash,
    blockHeight: BigInt(tx.block.block.header.height),
    timestamp: tx.block.block.header.time,
  });
  await transactionRecord.save();
}
*/

export async function handleMessage(msg: CosmosMessage): Promise<void> {
  logger.info("=================== Message =====================");
  logger.info("=================================================");
  logger.info(`handleMessage ${JSON.stringify(msg.msg.decodedMsg)}`)
  logger.info(`height ${JSON.stringify(msg.block.block.header.height)}`)

  const messageRecord = Message.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    sender: msg.msg.decodedMsg.sender,
    contract: msg.msg.decodedMsg.contract,
  });
  await messageRecord.save();
}

export async function handleEvent(event: CosmosEvent): Promise<void> {
  logger.info("=================== Event =====================");
  logger.info("===============================================");
  logger.info(`handleEvent ${JSON.stringify(event.event.attributes)}`)
  logger.info(`height ${JSON.stringify(event.block.block.header.height)}`)

  const eventRecord = ExecuteEvent.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    contractAddress: event.event.attributes.find(attr => attr.key === '_contract_address')!.value
  });

  await eventRecord.save();
}
