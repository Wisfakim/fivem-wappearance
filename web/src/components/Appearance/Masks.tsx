import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import { FlexWrapper } from './styles';
import Input from './components/Input';

import { ComponentSettings, PedComponent } from './interfaces';
interface ComponentsProps {
  settings: ComponentSettings[];
  data: PedComponent[];
  storedData: PedComponent[];
  handleComponentDrawableChange: (component_id: number, drawable: number) => void;
  handleComponentTextureChange: (component_id: number, texture: number) => void;
}

interface DataById<T> {
  [key: number]: T;
}

const Masks = ({
  settings,
  data,
  storedData,
  handleComponentDrawableChange,
  handleComponentTextureChange,
}: ComponentsProps) => {
  const { locales } = useNuiState();

  const settingsById = settings.reduce((object, { component_id, drawable, texture }) => {
    return { ...object, [component_id]: { drawable, texture } };
  }, {} as DataById<Omit<ComponentSettings, 'component_id'>>);

  const componentsById: any = data.reduce((object, { component_id, drawable, texture }) => {
    return { ...object, [component_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedComponent, 'component_id'>>);

  const storedComponentsById: any = storedData.reduce((object, { component_id, drawable, texture }) => {
    return { ...object, [component_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedComponent, 'component_id'>>);

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.components.mask}>
        <Item title={locales.components.mask}>
            <FlexWrapper>
              <Input
                title={locales.components.drawable}
                min={settingsById[1].drawable.min}
                max={settingsById[1].drawable.max}
                defaultValue={componentsById[1].drawable}
                clientValue={storedComponentsById[1].drawable}
                onChange={value => handleComponentDrawableChange(1, value)}
              />
              <Input
                title={locales.components.texture}
                min={settingsById[1].texture.min}
                max={settingsById[1].texture.max}
                defaultValue={componentsById[1].texture}
                clientValue={storedComponentsById[1].texture}
                onChange={value => handleComponentTextureChange(1, value)}
              />
            </FlexWrapper>
      </Item>
    </Section>
  );
};

export default Masks;