-- CreateTable
CREATE TABLE "Vendedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comprador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_transacao_externa" TEXT NOT NULL,
    "valor_total" DECIMAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AGUARDANDO_PAGAMENTO',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "compradorId" INTEGER NOT NULL,
    "vendedorId" INTEGER NOT NULL,
    CONSTRAINT "Pedido_compradorId_fkey" FOREIGN KEY ("compradorId") REFERENCES "Comprador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "Vendedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_transacao_stripe" TEXT NOT NULL,
    "status_transacao" TEXT NOT NULL,
    "valor_vendedor" DECIMAL NOT NULL,
    "valor_plataforma" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pedidoId" INTEGER NOT NULL,
    CONSTRAINT "Transacao_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Comprador_cpf_key" ON "Comprador"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_id_transacao_externa_key" ON "Pedido"("id_transacao_externa");

-- CreateIndex
CREATE UNIQUE INDEX "Transacao_id_transacao_stripe_key" ON "Transacao"("id_transacao_stripe");

-- CreateIndex
CREATE UNIQUE INDEX "Transacao_pedidoId_key" ON "Transacao"("pedidoId");
