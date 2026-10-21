(function () {
  // Apple campaign link: installs show up per `ct` in App Store Connect >
  // Analytics > Acquisition > Campaigns. PROVIDER_TOKEN (`pt`) comes from the
  // same screen; until it is filled in, the buttons keep their static href.
  var APP_ID = '6792940755';
  var PROVIDER_TOKEN = '';
  var DEFAULT_CAMPAIGN = 'site';
  if (!PROVIDER_TOKEN) return;
  // Bio links carry the channel (liftcue.coach/?ct=ig) so the landing page
  // does not swallow attribution.
  var ct = new URLSearchParams(location.search).get('ct') || '';
  if (!/^[a-z0-9_-]{1,32}$/.test(ct)) ct = DEFAULT_CAMPAIGN;
  var qs = new URLSearchParams();
  qs.set('pt', PROVIDER_TOKEN);
  qs.set('ct', ct);
  qs.set('mt', '8');
  var href = 'https://apps.apple.com/app/apple-store/id' + APP_ID + '?' + qs.toString();
  var links = document.querySelectorAll('a[data-store]');
  for (var i = 0; i < links.length; i++) links[i].href = href;
})();
