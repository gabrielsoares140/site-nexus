import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";
import QRCode from "qrcode";

const app = express();
app.use(cors());
app.use(express.json());

// TOKEN DO MERCADO PAGO (TESTE)
mercadopago.configure({
    access_token: "SEU_TOKEN_AQUI"
});

app.post("/pagar", async (req, res) => {
    try {
        const { itens } = req.body;

        const total = itens.reduce((sum, item) => sum + item.preco, 0);

        const pagamento = await mercadopago.payment.create({
            transaction_amount: total,
            description: "Compra Loja VTuber",
            payment_method_id: "pix",
            payer: {
                email: "comprador@teste.com"
            }
        });

        const qrCode = pagamento.body.point_of_interaction.transaction_data.qr_code;
        const qrCodeBase64 = await QRCode.toDataURL(qrCode);

        res.json({
            qr_code: qrCode,
            qr_code_base64: qrCodeBase64.replace(/^data:image\/png;base64,/, "")
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ error: "Erro ao gerar Pix" });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
