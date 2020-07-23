export function routeMatchStyle(routeMatch, trueText, falseText) {
  if (routeMatch && routeMatch.isExact) {
    return trueText;
  }
  return falseText;
}

export function sessionMatchStyle(sessionData, trueText, falseText) {
  if (sessionData) {
    return trueText;
  }
  return falseText;
}
