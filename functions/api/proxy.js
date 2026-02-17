export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const target = url.searchParams.get('url');
  if (!target) return new Response('Missing url', { status: 400 });

  const resp = await fetch(target, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const body = await resp.arrayBuffer();
  return new Response(body, {
    status: resp.status,
    headers: { 'Content-Type': resp.headers.get('Content-Type') || 'text/xml' }
  });
}
