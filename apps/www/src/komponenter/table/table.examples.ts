import type {
  HtmlSnippets,
  Imports,
  Snippets,
} from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Input } from '@ks-digital/designsystem-angular/forms'
import { Table, TableHeaderCell } from '@ks-digital/designsystem-angular/table'`,
  react: `import { Input, Table } from '@ks-digital/designsystem-react'`,
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

/** Same markup in every framework: the behaviour comes from the web package's script */
export const expandable: HtmlSnippets = {
  html: `<table class="ds-table">
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
      <td>
        <button type="button" aria-expanded="false">2024/1187</button>
      </td>
      <td>Byggesøknad</td>
      <td>04.03.2024</td>
      <td>Under behandling</td>
    </tr>
    <tr>
      <td colspan="4">
        Tilbygg på 24 m². Nabovarsel er sendt,
        frist for merknader er 25.03.2024.
      </td>
    </tr>
    <tr>
      <td>
        <button type="button" aria-expanded="false">2024/1203</button>
      </td>
      <td>Barnehageplass</td>
      <td>05.03.2024</td>
      <td>Godkjent</td>
    </tr>
    <tr>
      <td colspan="4">
        Plass i Solsiden barnehage fra 01.08.2024. Tilbudet er akseptert.
      </td>
    </tr>
    <tr>
      <td>
        <button type="button" aria-expanded="false">2024/1240</button>
      </td>
      <td>Skjenkebevilling</td>
      <td>11.03.2024</td>
      <td>Venter på vedlegg</td>
    </tr>
    <tr>
      <td colspan="4">
        Mangler politiattest for styrer og stedfortreder. Søker er varslet.
      </td>
    </tr>
  </tbody>
</table>`,
}

export const numbers: Snippets = {
  html: `<table class="ds-table" style="font-variant-numeric: tabular-nums">
  <caption>Søknader mottatt per måned</caption>
  <thead>
    <tr>
      <th>Måned</th>
      <th style="text-align: right">2023</th>
      <th style="text-align: right">2024</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Januar</th>
      <td style="text-align: right">1 230</td>
      <td style="text-align: right">1 450</td>
    </tr>
    <tr>
      <th scope="row">Februar</th>
      <td style="text-align: right">980</td>
      <td style="text-align: right">1 120</td>
    </tr>
    <tr>
      <th scope="row">Mars</th>
      <td style="text-align: right">1 150</td>
      <td style="text-align: right">1 300</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Totalt</th>
      <td style="text-align: right">3 360</td>
      <td style="text-align: right">3 870</td>
    </tr>
  </tfoot>
</table>`,
  angular: `<table ksd-table style="font-variant-numeric: tabular-nums">
  <caption>Søknader mottatt per måned</caption>
  <thead>
    <tr>
      <th>Måned</th>
      <th style="text-align: right">2023</th>
      <th style="text-align: right">2024</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Januar</th>
      <td style="text-align: right">1 230</td>
      <td style="text-align: right">1 450</td>
    </tr>
    <tr>
      <th scope="row">Februar</th>
      <td style="text-align: right">980</td>
      <td style="text-align: right">1 120</td>
    </tr>
    <tr>
      <th scope="row">Mars</th>
      <td style="text-align: right">1 150</td>
      <td style="text-align: right">1 300</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Totalt</th>
      <td style="text-align: right">3 360</td>
      <td style="text-align: right">3 870</td>
    </tr>
  </tfoot>
</table>`,
  react: `<Table style={{ fontVariantNumeric: 'tabular-nums' }}>
  <caption>Søknader mottatt per måned</caption>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Måned</Table.HeaderCell>
      <Table.HeaderCell style={{ textAlign: 'right' }}>2023</Table.HeaderCell>
      <Table.HeaderCell style={{ textAlign: 'right' }}>2024</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.HeaderCell scope="row">Januar</Table.HeaderCell>
      <Table.Cell style={{ textAlign: 'right' }}>1 230</Table.Cell>
      <Table.Cell style={{ textAlign: 'right' }}>1 450</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.HeaderCell scope="row">Februar</Table.HeaderCell>
      <Table.Cell style={{ textAlign: 'right' }}>980</Table.Cell>
      <Table.Cell style={{ textAlign: 'right' }}>1 120</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.HeaderCell scope="row">Mars</Table.HeaderCell>
      <Table.Cell style={{ textAlign: 'right' }}>1 150</Table.Cell>
      <Table.Cell style={{ textAlign: 'right' }}>1 300</Table.Cell>
    </Table.Row>
  </Table.Body>
  <Table.Foot>
    <Table.Row>
      <Table.HeaderCell scope="row">Totalt</Table.HeaderCell>
      <Table.Cell style={{ textAlign: 'right' }}>3 360</Table.Cell>
      <Table.Cell style={{ textAlign: 'right' }}>3 870</Table.Cell>
    </Table.Row>
  </Table.Foot>
</Table>`,
}

export const formElements: Snippets = {
  html: `<table class="ds-table">
  <thead>
    <tr>
      <th>
        <input class="ds-input" type="checkbox" aria-label="Velg alle søknader" />
      </th>
      <th>Saksnummer</th>
      <th>Søknad</th>
      <th>Kommentar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input class="ds-input" type="checkbox" aria-label="Velg sak 2024/1187" />
      </td>
      <td>2024/1187</td>
      <td>Byggesøknad</td>
      <td>
        <input
          class="ds-input"
          type="text"
          data-size="sm"
          aria-label="Kommentar til sak 2024/1187"
        />
      </td>
    </tr>
    <tr>
      <td>
        <input class="ds-input" type="checkbox" aria-label="Velg sak 2024/1203" />
      </td>
      <td>2024/1203</td>
      <td>Barnehageplass</td>
      <td>
        <input
          class="ds-input"
          type="text"
          data-size="sm"
          aria-label="Kommentar til sak 2024/1203"
        />
      </td>
    </tr>
    <tr>
      <td>
        <input class="ds-input" type="checkbox" aria-label="Velg sak 2024/1240" />
      </td>
      <td>2024/1240</td>
      <td>Skjenkebevilling</td>
      <td>
        <input
          class="ds-input"
          type="text"
          data-size="sm"
          aria-label="Kommentar til sak 2024/1240"
        />
      </td>
    </tr>
  </tbody>
</table>`,
  angular: `<table ksd-table>
  <thead>
    <tr>
      <th>
        <input ksd-input type="checkbox" aria-label="Velg alle søknader" />
      </th>
      <th>Saksnummer</th>
      <th>Søknad</th>
      <th>Kommentar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input ksd-input type="checkbox" aria-label="Velg sak 2024/1187" />
      </td>
      <td>2024/1187</td>
      <td>Byggesøknad</td>
      <td>
        <input
          ksd-input
          type="text"
          data-size="sm"
          aria-label="Kommentar til sak 2024/1187"
        />
      </td>
    </tr>
    <tr>
      <td>
        <input ksd-input type="checkbox" aria-label="Velg sak 2024/1203" />
      </td>
      <td>2024/1203</td>
      <td>Barnehageplass</td>
      <td>
        <input
          ksd-input
          type="text"
          data-size="sm"
          aria-label="Kommentar til sak 2024/1203"
        />
      </td>
    </tr>
    <tr>
      <td>
        <input ksd-input type="checkbox" aria-label="Velg sak 2024/1240" />
      </td>
      <td>2024/1240</td>
      <td>Skjenkebevilling</td>
      <td>
        <input
          ksd-input
          type="text"
          data-size="sm"
          aria-label="Kommentar til sak 2024/1240"
        />
      </td>
    </tr>
  </tbody>
</table>`,
  react: `<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>
        <Input type="checkbox" aria-label="Velg alle søknader" />
      </Table.HeaderCell>
      <Table.HeaderCell>Saksnummer</Table.HeaderCell>
      <Table.HeaderCell>Søknad</Table.HeaderCell>
      <Table.HeaderCell>Kommentar</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Input type="checkbox" aria-label="Velg sak 2024/1187" />
      </Table.Cell>
      <Table.Cell>2024/1187</Table.Cell>
      <Table.Cell>Byggesøknad</Table.Cell>
      <Table.Cell>
        <Input data-size="sm" aria-label="Kommentar til sak 2024/1187" />
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Input type="checkbox" aria-label="Velg sak 2024/1203" />
      </Table.Cell>
      <Table.Cell>2024/1203</Table.Cell>
      <Table.Cell>Barnehageplass</Table.Cell>
      <Table.Cell>
        <Input data-size="sm" aria-label="Kommentar til sak 2024/1203" />
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Input type="checkbox" aria-label="Velg sak 2024/1240" />
      </Table.Cell>
      <Table.Cell>2024/1240</Table.Cell>
      <Table.Cell>Skjenkebevilling</Table.Cell>
      <Table.Cell>
        <Input data-size="sm" aria-label="Kommentar til sak 2024/1240" />
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
}

export const fixedLayout: Snippets = {
  html: `<table class="ds-table" style="table-layout: fixed">
  <thead>
    <tr>
      <th>Saksnummer</th>
      <th>Søknad</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2024/1187</td>
      <td>Byggesøknad</td>
      <td>Under behandling</td>
    </tr>
    <tr>
      <td>2024/1203</td>
      <td>Barnehageplass</td>
      <td>Godkjent</td>
    </tr>
    <tr>
      <td>2024/1240</td>
      <td>Skjenkebevilling</td>
      <td>Venter på vedlegg</td>
    </tr>
  </tbody>
</table>`,
  angular: `<table ksd-table style="table-layout: fixed">
  <thead>
    <tr>
      <th>Saksnummer</th>
      <th>Søknad</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2024/1187</td>
      <td>Byggesøknad</td>
      <td>Under behandling</td>
    </tr>
    <tr>
      <td>2024/1203</td>
      <td>Barnehageplass</td>
      <td>Godkjent</td>
    </tr>
    <tr>
      <td>2024/1240</td>
      <td>Skjenkebevilling</td>
      <td>Venter på vedlegg</td>
    </tr>
  </tbody>
</table>`,
  react: `<Table style={{ tableLayout: 'fixed' }}>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Saksnummer</Table.HeaderCell>
      <Table.HeaderCell>Søknad</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>2024/1187</Table.Cell>
      <Table.Cell>Byggesøknad</Table.Cell>
      <Table.Cell>Under behandling</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2024/1203</Table.Cell>
      <Table.Cell>Barnehageplass</Table.Cell>
      <Table.Cell>Godkjent</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>2024/1240</Table.Cell>
      <Table.Cell>Skjenkebevilling</Table.Cell>
      <Table.Cell>Venter på vedlegg</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
}

export const multipleHeaderRows: Snippets = {
  html: `<table class="ds-table">
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <thead>
    <tr>
      <th colspan="2" scope="colgroup">Søker</th>
      <th colspan="2" scope="colgroup">Søknad</th>
    </tr>
    <tr>
      <th>Navn</th>
      <th>Kommune</th>
      <th>Type</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Kari Nordmann</td>
      <td>Bergen</td>
      <td>Byggesøknad</td>
      <td>Under behandling</td>
    </tr>
    <tr>
      <td>Ola Nordmann</td>
      <td>Tromsø</td>
      <td>Barnehageplass</td>
      <td>Godkjent</td>
    </tr>
    <tr>
      <td>Lise Nordmann</td>
      <td>Kristiansand</td>
      <td>Skjenkebevilling</td>
      <td>Venter på vedlegg</td>
    </tr>
  </tbody>
</table>`,
  angular: `<table ksd-table>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <thead>
    <tr>
      <th colspan="2" scope="colgroup">Søker</th>
      <th colspan="2" scope="colgroup">Søknad</th>
    </tr>
    <tr>
      <th>Navn</th>
      <th>Kommune</th>
      <th>Type</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Kari Nordmann</td>
      <td>Bergen</td>
      <td>Byggesøknad</td>
      <td>Under behandling</td>
    </tr>
    <tr>
      <td>Ola Nordmann</td>
      <td>Tromsø</td>
      <td>Barnehageplass</td>
      <td>Godkjent</td>
    </tr>
    <tr>
      <td>Lise Nordmann</td>
      <td>Kristiansand</td>
      <td>Skjenkebevilling</td>
      <td>Venter på vedlegg</td>
    </tr>
  </tbody>
</table>`,
  react: `<Table>
  <colgroup span={2} />
  <colgroup span={2} />
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell colSpan={2} scope="colgroup">
        Søker
      </Table.HeaderCell>
      <Table.HeaderCell colSpan={2} scope="colgroup">
        Søknad
      </Table.HeaderCell>
    </Table.Row>
    <Table.Row>
      <Table.HeaderCell>Navn</Table.HeaderCell>
      <Table.HeaderCell>Kommune</Table.HeaderCell>
      <Table.HeaderCell>Type</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Kari Nordmann</Table.Cell>
      <Table.Cell>Bergen</Table.Cell>
      <Table.Cell>Byggesøknad</Table.Cell>
      <Table.Cell>Under behandling</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Ola Nordmann</Table.Cell>
      <Table.Cell>Tromsø</Table.Cell>
      <Table.Cell>Barnehageplass</Table.Cell>
      <Table.Cell>Godkjent</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Lise Nordmann</Table.Cell>
      <Table.Cell>Kristiansand</Table.Cell>
      <Table.Cell>Skjenkebevilling</Table.Cell>
      <Table.Cell>Venter på vedlegg</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
}
