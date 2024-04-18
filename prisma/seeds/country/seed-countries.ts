import { Prisma, PrismaClient } from '@prisma/client';
import { State, Country } from './types';
import axios from 'axios';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function seedCountries(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
) {
  const { data: countries } = await axios.get<Country[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/paises',
  );

  const createCountryDto = countries.map((country) => ({
    name: country.nome,
    iso3: country?.id['ISO-ALPHA-3'],
    iso2: country?.id['ISO-ALPHA-2'],
    intermediaryRegion: country['regiao-intermediaria']?.nome,
    subRegion: country['sub-regiao']?.nome,
    continent: country['sub-regiao']?.regiao?.nome,
    deletedAt: null,
  }));

  await tx.country.createMany({ data: createCountryDto });

  const brazil = await tx.country.findFirst({
    where: { iso3: 'BRA', deletedAt: null },
  });

  const { data: states } = await axios.get<State[]>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados`,
  );

  const createStateDto = states.map((state) => ({
    name: state.nome,
    code3: state.sigla,
    ibgeId: state?.id?.toString(),
    countryId: brazil.id,
    region: state.regiao.nome,
    deletedAt: null,
  }));

  await tx.state.createMany({
    data: createStateDto,
  });
}
