# M324 Basisprojekt

## Continuous Integration (CI) Pipeline

Für dieses Projekt habe ich eine automatisierte CI-Pipeline mittels GitHub Actions eingerichtet. Meine Konfiguration befindet sich unter
`.github/workflows/main.yml`.

### Funktionsweise der Pipeline

Ich habe die Pipeline so konfiguriert, dass sie den Code überwacht und automatisch bei jedem `push` sowie bei jedem `pull_request` auf den `main`-Branch triggert. Sie ist in zwei parallele Jobs (`build-java-api` und `build-react-app`) unterteilt, um Zeit zu sparen.

Am Ende jedes erfolgreichen Builds lädt die Pipeline meine fertigen Applikationen (das `.war`-File des Backends und die statischen Web-Dateien des Frontends) als ladbare Artefakte (`java-build` und `react-build`) auf GitHub hoch.

### Getroffene Entscheidungen & Begründungen

Um zu gewährleisten, dass die Pipeline performant und fehlerfrei läuft, habe ich mich für folgende Konfigurationen entschieden:

- _Wahl des Images (`runs-on: ubuntu-latest`):_
  _Begründung:_ Ich habe mich bewusst für das offizielle Ubuntu-Linux-Image von GitHub entschieden. Es ist leichtgewichtig, ressourcenschonend und eliminiert typische Pfad- oder Berechtigungsprobleme, die bei Windows-Runnern oft auftreten. Zudem laufen Tools wie `npm` und `mvn` in dieser Umgebung nativ extrem schnell.

- _Verwendung aktueller Actions (`@v4`):_
  _Begründung:_ Alle meine verwendeten GitHub Actions (`checkout`, `setup-java`, `setup-node`, `upload-artifact`) setze ich strikt in der Version 4 (`@v4`) ein. Ältere Versionen (wie v3) basieren auf veralteten Node.js-Umgebungen und werfen Warnungen. Version 4 läuft nativ auf Node 20 und garantiert mir eine zuverlässige Ausführung.

- _Java Distribution (`temurin` JDK 17) & Dateiformat (.war):_
  _Begründung:_ Temurin ist die empfohlene Open-Source-Distribution für Java. Ich habe Version 17 gewählt, da sie als LTS-Version perfekt mit Spring Boot 3 harmoniert. Zudem habe ich in der `pom.xml` das Packaging auf `<packaging>war</packaging>` umgestellt, da das Artefakt in einem späteren Schritt auf einem eigenständigen Tomcat-Server (ohne embedded Server) deployed werden soll.

- _Frontend-Installation (`npm ci` statt `npm install`):_
  _Begründung:_ In meiner Pipeline verwende ich `npm ci` (Clean Install). Dieser Befehl löscht den `node_modules`-Ordner und installiert die Abhängigkeiten exakt nach der `package-lock.json`. Das verhindert unerwartete Versionssprünge während des Builds und sorgt für 100% reproduzierbare Ergebnisse.

- _Einsatz von Caching:_
  _Begründung:_ Sowohl für Maven (`cache: maven`) als auch für npm (`cache: npm`) habe ich das Caching aktiviert. Dies verhindert, dass meine Pipeline bei jedem Run hunderte Megabytes an Dependencies neu herunterladen muss, was meine Build-Dauer drastisch verkürzt.

## 06A

GitHub flow branching Strategie implementiert

## 06B

Pull Request Test erfolgreich
