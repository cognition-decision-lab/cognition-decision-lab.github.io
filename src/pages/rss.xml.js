export async function GET() {
    return new Response('Blog/RSS disabled', {
        status: 204,
        headers: { 'content-type': 'text/plain' }
    });
}
