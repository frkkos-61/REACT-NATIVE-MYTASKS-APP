import {Datepicker} from '@ui-kitten/components';

const CustomDatePicker = props => {
  const {onSelectDate} = props; //obje dağıtma yöntemi
  return (
    <Datepicker {...props} onSelect={nextDate => onSelectDate(nextDate)} />
  );
};

export default CustomDatePicker;
