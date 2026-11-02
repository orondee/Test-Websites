export const CONTACT_INFO = {
  name: 'Oronde Stewart',
  studioName: "Oronde's Web Studio",
  email: 'orondestewart1@gmail.com',
  phone: '(212) 555-0198',
  location: 'Brooklyn, New York · Remote Worldwide',
  github: 'https://github.com/orondee/Test-Websites',
  responseTime: 'Within 4 hours',
  guaranteeDays: 30
} as const;

export function buildMailtoUrl(params: {
  subject: string;
  body: string;
}): string {
  const query = new URLSearchParams({
    subject: params.subject,
    body: params.body
  });
  return `mailto:${CONTACT_INFO.email}?${query.toString()}`;
}
