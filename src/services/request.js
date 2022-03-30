import net from './index';

export class Params {}

export default async function request(
  api = window.location.href,
  method = 'POST',
  body = {},
) {
  const result = await net.request(api, {
    type: 'ajax',
    method: method || 'POST',
    data: body,
    showError: true,
  });

  return result;
}
