import { NumberHelper } from '../../helper/NumberHelper.js';
import { ATTRIBUTE_CHINESE } from './AttributeChinese.js';

export class AttributeFormatter {
    static f(attrKey, value, len = -1) {
        const isPercentage = ['speed', 'cProb', 'cScale', 'miss', 'absorb'].includes(attrKey);
        const formattedValue = isPercentage
            ? NumberHelper.fnp(value, len)
            : NumberHelper.fn(value, len);

        return `${formattedValue}`;
    }
    
    static fl(attrKey, value, len = -1) {
        const chineseName = ATTRIBUTE_CHINESE[attrKey];
        if (!chineseName) return '';

        const isPercentage = ['speed', 'cProb', 'cScale', 'miss', 'absorb'].includes(attrKey);
        const formattedValue = isPercentage
            ? NumberHelper.fnp(value, len)
            : NumberHelper.fn(value, len);

        return `${chineseName}: ${formattedValue}`;
    }
}