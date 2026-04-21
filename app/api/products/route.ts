export async function GET() {
  const res = await fetch(
    `https://api.nuvemshop.com.br/v1/${process.env.NUVEMSHOP_STORE_ID}/products`,
    {
      headers: {
        Authentication: `bearer ${process.env.NUVEMSHOP_ACCESS_TOKEN}`,
        "User-Agent": "Arnecke (isabelamuller1@gmail.com)",
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();

  return Response.json(data);
}
