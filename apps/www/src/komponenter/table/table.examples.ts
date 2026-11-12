import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Table, TableHeaderCell } from '@ks-digital/designsystem-angular/table'`,
  react: `import { Table } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<table class="ds-table">
  <caption>Søknader mottatt i mars</caption>
  <thead>
    <tr>
      <th>Saksnummer</th>
      <th>Søknad</th>
      <th>Mottatt</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2024/1187</td>
      <td>Byggesøknad</td>
      <td>04.03.2024</td>
      <td>Under behandling</td>
    </tr>
    <tr>
      <td>2024/1203</td>
      <td>Barnehageplass</td>
      <td>05.03.2024</td>
      <td>Godkjent</td>
    </tr>
    <tr>
      <td>2024/1240</td>
      <td>Skjenkebevilling</td>
      <td>11.03.2024</td>
      <td>Venter på vedlegg</td>
    </tr>
    <tr>
      <td>2024/1262</td>
      <td>Parkeringstillatelse</td>
      <td>14.03.2024</td>
      <td>Godkjent</td>
    </tr>
  </tbody>
</table>`,
  angular: `<table ksd-table>
  <caption>Søknader mottatt i mars</caption>
  <thead>
    <tr>
      <th>Saksnummer</th>
      <th>Søknad</th>
      <th>Mottatt</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2024/1187</td>
      <td>Byggesøknad</td>
      <td>04.03.2024</td>
      <td>Under behandling</td>
    </tr>
    <tr>
      <td>2024/1203</td>
      <td>Barnehageplass</td>
      <td>05.03.2024</td>
      <td>Godkjent</td>
    </tr>
    <tr>
      <td>2024/1240</td>
      <td>Skjenkebevilling</td>
      <td>11.03.2024</td>
      <td>Venter på vedlegg</td>
    </tr>
    <tr>
      <td>2024/1262</td>
      <td>Parkeringstillatelse</td>
      <td>14.03.2024</td>
      <td>Godkjent</td>
    </tr>
  </tbody>
</table>`,
  react: `<Table>
  <caption>Søknader mottatt i mars</caption>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Saksnummer</Table.HeaderCell>
      <Table.HeaderCell>Søknad</Table.HeaderCell>
      <Table.HeaderCell>Mottatt</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>2024/1187</Table.Cell>
      <Table.Cell>Byggesøknad</Table.Cell>
      <Table.Cell>04.03.2024</Table.Cell>
      <Table.Cell>Under behandling</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2024/1203</Table.Cell>
      <Table.Cell>Barnehageplass</Table.Cell>
      <Table.Cell>05.03.2024</Table.Cell>
      <Table.Cell>Godkjent</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2024/1240</Table.Cell>
      <Table.Cell>Skjenkebevilling</Table.Cell>
      <Table.Cell>11.03.2024</Table.Cell>
      <Table.Cell>Venter på vedlegg</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2024/1262</Table.Cell>
      <Table.Cell>Parkeringstillatelse</Table.Cell>
      <Table.Cell>14.03.2024</Table.Cell>
      <Table.Cell>Godkjent</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
}

export const sortable: Snippets = {
  html: `<!-- Oppdater aria-sort og rekkefølgen på radene når brukeren klikker -->
<table class="ds-table">
  <thead>
    <tr>
      <th aria-sort="none">
        <button type="button">Saksnummer</button>
      </th>
      <th>Søknad</th>
      <th aria-sort="descending">
        <button type="button">Mottatt</button>
      </th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2024/1262</td>
      <td>Parkeringstillatelse</td>
      <td>14.03.2024</td>
      <td>Godkjent</td>
    </tr>
    <tr>
      <td>2024/1240</td>
      <td>Skjenkebevilling</td>
      <td>11.03.2024</td>
      <td>Venter på vedlegg</td>
    </tr>
    <tr>
      <td>2024/1203</td>
      <td>Barnehageplass</td>
      <td>05.03.2024</td>
      <td>Godkjent</td>
    </tr>
    <tr>
      <td>2024/1187</td>
      <td>Byggesøknad</td>
      <td>04.03.2024</td>
      <td>Under behandling</td>
    </tr>
  </tbody>
</table>`,
  angular: `<table ksd-table>
  <thead>
    <tr>
      <th ksd-header-cell aria-sort="none" (sortChange)="sortBy('saksnummer')">
        Saksnummer
      </th>
      <th>Søknad</th>
      <th ksd-header-cell aria-sort="descending" (sortChange)="sortBy('mottatt')">
        Mottatt
      </th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2024/1262</td>
      <td>Parkeringstillatelse</td>
      <td>14.03.2024</td>
      <td>Godkjent</td>
    </tr>
    <tr>
      <td>2024/1240</td>
      <td>Skjenkebevilling</td>
      <td>11.03.2024</td>
      <td>Venter på vedlegg</td>
    </tr>
    <tr>
      <td>2024/1203</td>
      <td>Barnehageplass</td>
      <td>05.03.2024</td>
      <td>Godkjent</td>
    </tr>
    <tr>
      <td>2024/1187</td>
      <td>Byggesøknad</td>
      <td>04.03.2024</td>
      <td>Under behandling</td>
    </tr>
  </tbody>
</table>`,
  react: `<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell sort="none" onClick={() => sortBy('saksnummer')}>
        Saksnummer
      </Table.HeaderCell>
      <Table.HeaderCell>Søknad</Table.HeaderCell>
      <Table.HeaderCell sort="descending" onClick={() => sortBy('mottatt')}>
        Mottatt
      </Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>2024/1262</Table.Cell>
      <Table.Cell>Parkeringstillatelse</Table.Cell>
      <Table.Cell>14.03.2024</Table.Cell>
      <Table.Cell>Godkjent</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2024/1240</Table.Cell>
      <Table.Cell>Skjenkebevilling</Table.Cell>
      <Table.Cell>11.03.2024</Table.Cell>
      <Table.Cell>Venter på vedlegg</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2024/1203</Table.Cell>
      <Table.Cell>Barnehageplass</Table.Cell>
      <Table.Cell>05.03.2024</Table.Cell>
      <Table.Cell>Godkjent</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2024/1187</Table.Cell>
      <Table.Cell>Byggesøknad</Table.Cell>
      <Table.Cell>04.03.2024</Table.Cell>
      <Table.Cell>Under behandling</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
}

export const stickyHeader: Snippets = {
  html: `<div style="max-height: 15rem; overflow: auto">
  <table class="ds-table" data-sticky-header>
    <thead>
      <tr>
        <th>Saksnummer</th>
        <th>Søknad</th>
        <th>Mottatt</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2024/1100</td>
        <td>Byggesøknad</td>
        <td>01.04.2024</td>
        <td>Under behandling</td>
      </tr>
      <tr>
        <td>2024/1107</td>
        <td>Barnehageplass</td>
        <td>02.04.2024</td>
        <td>Godkjent</td>
      </tr>
      <tr>
        <td>2024/1114</td>
        <td>Skjenkebevilling</td>
        <td>03.04.2024</td>
        <td>Venter på vedlegg</td>
      </tr>
      <tr>
        <td>2024/1121</td>
        <td>Parkeringstillatelse</td>
        <td>04.04.2024</td>
        <td>Godkjent</td>
      </tr>
      <tr>
        <td>2024/1128</td>
        <td>Byggesøknad</td>
        <td>05.04.2024</td>
        <td>Under behandling</td>
      </tr>
      <tr>
        <td>2024/1135</td>
        <td>Barnehageplass</td>
        <td>06.04.2024</td>
        <td>Godkjent</td>
      </tr>
      <tr>
        <td>2024/1142</td>
        <td>Skjenkebevilling</td>
        <td>07.04.2024</td>
        <td>Venter på vedlegg</td>
      </tr>
      <tr>
        <td>2024/1149</td>
        <td>Parkeringstillatelse</td>
        <td>08.04.2024</td>
        <td>Godkjent</td>
      </tr>
    </tbody>
  </table>
</div>`,
  angular: `<div style="max-height: 15rem; overflow: auto">
  <table ksd-table data-sticky-header>
    <thead>
      <tr>
        <th>Saksnummer</th>
        <th>Søknad</th>
        <th>Mottatt</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2024/1100</td>
        <td>Byggesøknad</td>
        <td>01.04.2024</td>
        <td>Under behandling</td>
      </tr>
      <tr>
        <td>2024/1107</td>
        <td>Barnehageplass</td>
        <td>02.04.2024</td>
        <td>Godkjent</td>
      </tr>
      <tr>
        <td>2024/1114</td>
        <td>Skjenkebevilling</td>
        <td>03.04.2024</td>
        <td>Venter på vedlegg</td>
      </tr>
      <tr>
        <td>2024/1121</td>
        <td>Parkeringstillatelse</td>
        <td>04.04.2024</td>
        <td>Godkjent</td>
      </tr>
      <tr>
        <td>2024/1128</td>
        <td>Byggesøknad</td>
        <td>05.04.2024</td>
        <td>Under behandling</td>
      </tr>
      <tr>
        <td>2024/1135</td>
        <td>Barnehageplass</td>
        <td>06.04.2024</td>
        <td>Godkjent</td>
      </tr>
      <tr>
        <td>2024/1142</td>
        <td>Skjenkebevilling</td>
        <td>07.04.2024</td>
        <td>Venter på vedlegg</td>
      </tr>
      <tr>
        <td>2024/1149</td>
        <td>Parkeringstillatelse</td>
        <td>08.04.2024</td>
        <td>Godkjent</td>
      </tr>
    </tbody>
  </table>
</div>`,
  react: `<div style={{ maxHeight: '15rem', overflow: 'auto' }}>
  <Table stickyHeader>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>Saksnummer</Table.HeaderCell>
        <Table.HeaderCell>Søknad</Table.HeaderCell>
        <Table.HeaderCell>Mottatt</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.Cell>2024/1100</Table.Cell>
        <Table.Cell>Byggesøknad</Table.Cell>
        <Table.Cell>01.04.2024</Table.Cell>
        <Table.Cell>Under behandling</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2024/1107</Table.Cell>
        <Table.Cell>Barnehageplass</Table.Cell>
        <Table.Cell>02.04.2024</Table.Cell>
        <Table.Cell>Godkjent</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2024/1114</Table.Cell>
        <Table.Cell>Skjenkebevilling</Table.Cell>
        <Table.Cell>03.04.2024</Table.Cell>
        <Table.Cell>Venter på vedlegg</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2024/1121</Table.Cell>
        <Table.Cell>Parkeringstillatelse</Table.Cell>
        <Table.Cell>04.04.2024</Table.Cell>
        <Table.Cell>Godkjent</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2024/1128</Table.Cell>
        <Table.Cell>Byggesøknad</Table.Cell>
        <Table.Cell>05.04.2024</Table.Cell>
        <Table.Cell>Under behandling</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2024/1135</Table.Cell>
        <Table.Cell>Barnehageplass</Table.Cell>
        <Table.Cell>06.04.2024</Table.Cell>
        <Table.Cell>Godkjent</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2024/1142</Table.Cell>
        <Table.Cell>Skjenkebevilling</Table.Cell>
        <Table.Cell>07.04.2024</Table.Cell>
        <Table.Cell>Venter på vedlegg</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2024/1149</Table.Cell>
        <Table.Cell>Parkeringstillatelse</Table.Cell>
        <Table.Cell>08.04.2024</Table.Cell>
        <Table.Cell>Godkjent</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</div>`,
}
