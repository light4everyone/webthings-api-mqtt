function mqttMatch(topic: string, wildcard: string): string[] {
  if (topic === wildcard) {
      return [];
  } else if (wildcard === '#') {
      return [topic];
  }

  const res: string[] = [];

  const t = String(topic).split('/');
  const w = String(wildcard).split('/');

  let i = 0;
  for (const lt = t.length; i < lt; i++) {
      if (w[i] === '+') {
          res.push(t[i]);
      } else if (w[i] === '#') {
          res.push(t.slice(i).join('/'));
          return res;
      } else if (w[i] !== t[i]) {
          return null;
      }
  }

  if (w[i] === '#') {
      i += 1;
  }

  return (i === w.length) ? res : null;
}

export default mqttMatch;
