import { expect } from 'chai';
import Gift from 'Gift';

describe('Gift', () => {
  let gift;

  beforeEach(() => {
    gift = new Gift(14, 'Alex', 'Sprinter Van', 'https://www.mbvans.com/en/vehicles/build/sprinter/cargo-van/mxca4x?variantType=HIGHROOF&selectedTrimOptionIds=0:D03&selectedSpecifications=Wheelbase%20/%20Roof%20Height,2850,144%22%20Wheelbase,High%20Roof;Powertrain,14455,6%20Cylinder%20Diesel%204x4,;Class,4820,3500XD,Payload&options=0:D03,4:VF4,2:7755,9:X13,9:X67,9:X01,9:C00,9:X69,9:X68,0:JA7,0:JB4,0:JB7,0:JF1,0:XM4,9:C01,9:C03,9:CA2,0:F49,0:W54,0:LB9,0:T55,0:ET4,0:N63,0:E36,0:E2M,0:T57,0:COMMW3&category=upfitting', 82691);
  })

  it('should be an instance of Gift', () => {
    expect(gift).to.be.an.instanceOf(Gift);
  })

  it('should have an id', () => {
    expect(gift.id).to.deep.equal(14);
  })

  it('should have a recipient', () => {
    expect(gift.recipient).to.deep.equal('Alex');
  })

  it('should have a name for the gift', () => {
    expect(gift.name).to.deep.equal('Mercedes Sprinter Van');
  })

  it('should have a default link of an empty string if none is provided by the user', () => {
    expect(gift.link).to.equal('');
  })

  it('should have a link if the user provides one', () => {
    expect(gift.link).to.deep.equal('https://www.mbvans.com/en/vehicles/build/sprinter/cargo-van/mxca4x?variantType=HIGHROOF&selectedTrimOptionIds=0:D03&selectedSpecifications=Wheelbase%20/%20Roof%20Height,2850,144%22%20Wheelbase,High%20Roof;Powertrain,14455,6%20Cylinder%20Diesel%204x4,;Class,4820,3500XD,Payload&options=0:D03,4:VF4,2:7755,9:X13,9:X67,9:X01,9:C00,9:X69,9:X68,0:JA7,0:JB4,0:JB7,0:JF1,0:XM4,9:C01,9:C03,9:CA2,0:F49,0:W54,0:LB9,0:T55,0:ET4,0:N63,0:E36,0:E2M,0:T57,0:COMMW3&category=upfitting');
  })

  it('should be able to keep track of the cost in dollars', () => {
    expect(gift.priceInDollars).to.deep.equal(82691);
  })
})