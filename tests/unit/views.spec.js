import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import Role from '@/views/Role.vue';
import Transfer from '@/views/Transfer.vue';
import Profile from '@/views/Profile.vue';
import Payment from '@/views/Payment.vue';
import Order from '@/views/Order.vue';
import Merchant from '@/views/Merchant.vue';
import Invoice from '@/views/Invoice.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import Admin from '@/views/Admin.vue';
import Banner from '@/views/Banner.vue';
import CopyMerchant from '@/views/CopyMerchant.vue';
import InvoiceDownload from '@/views/InvoiceDownload.vue';
import TermsConditions from '@/views/TermsConditions.vue';
import _Components from '@/views/_Components.vue';

describe('Login.vue', () => {
  it('has the expected html structure', () => {
    expect(Login.$el).toMatchSnapshot();
  });

  it('should have "Login" as name', () => {
    expect(Login.name).toBe('Login');
  });
});

describe('Role.vue', () => {
  it('has the expected html structure', () => {
    expect(Role.$el).toMatchSnapshot();
  });

  it('should have "Role" as name', () => {
    expect(Role.name).toBe('Role');
  });
});

describe('Transfer.vue', () => {
  it('has the expected html structure', () => {
    expect(Transfer.$el).toMatchSnapshot();
  });

  it('should have "Transfer" as name', () => {
    expect(Transfer.name).toBe('Transfer');
  });
});

describe('Profile.vue', () => {
  it('has the expected html structure', () => {
    expect(Profile.$el).toMatchSnapshot();
  });

  it('should have "Profile" as name', () => {
    expect(Profile.name).toBe('Profile');
  });
});

describe('Payment.vue', () => {
  it('has the expected html structure', () => {
    expect(Payment.$el).toMatchSnapshot();
  });

  it('should have "Payment" as name', () => {
    expect(Payment.name).toBe('Payment');
  });
});

describe('Order.vue', () => {
  it('has the expected html structure', () => {
    expect(Order.$el).toMatchSnapshot();
  });

  it('should have "Order" as name', () => {
    expect(Order.name).toBe('Order');
  });
});

describe('Merchant.vue', () => {
  it('has the expected html structure', () => {
    expect(Merchant.$el).toMatchSnapshot();
  });

  it('should have "Merchant" as name', () => {
    expect(Merchant.name).toBe('Merchant');
  });
});

describe('Invoice.vue', () => {
  it('has the expected html structure', () => {
    expect(Invoice.$el).toMatchSnapshot();
  });

  it('should have "Invoice" as name', () => {
    expect(Invoice.name).toBe('Invoice');
  });
});

describe('ResetPassword.vue', () => {
  it('has the expected html structure', () => {
    expect(ResetPassword.$el).toMatchSnapshot();
  });

  it('should have "ResetPassword" as name', () => {
    expect(ResetPassword.name).toBe('ResetPassword');
  });
});

describe('Home.vue', () => {
  it('has the expected html structure', () => {
    expect(Home.$el).toMatchSnapshot();
  });

  it('should have "Home" as name', () => {
    expect(Home.name).toBe('Home');
  });
});

describe('Dashboard.vue', () => {
  it('has the expected html structure', () => {
    expect(Dashboard.$el).toMatchSnapshot();
  });

  it('should have "Dashboard" as name', () => {
    expect(Dashboard.name).toBe('Dashboard');
  });
});

describe('Admin.vue', () => {
  it('has the expected html structure', () => {
    expect(Admin.$el).toMatchSnapshot();
  });

  it('should have "Admin" as name', () => {
    expect(Admin.name).toBe('Admin');
  });
});

describe('Banner.vue', () => {
  it('has the expected html structure', () => {
    expect(Banner.$el).toMatchSnapshot();
  });

  it('should have "Banner" as name', () => {
    expect(Banner.name).toBe('Banner');
  });
});

describe('CopyMerchant.vue', () => {
  it('has the expected html structure', () => {
    expect(CopyMerchant.$el).toMatchSnapshot();
  });

  it('should have "CopyMerchant" as name', () => {
    expect(CopyMerchant.name).toBe('CopyMerchant');
  });
});

describe('InvoiceDownload.vue', () => {
  it('has the expected html structure', () => {
    expect(InvoiceDownload.$el).toMatchSnapshot();
  });

  it('should have "InvoiceDownload" as name', () => {
    expect(InvoiceDownload.name).toBe('InvoiceDownload');
  });
});

describe('TermsConditions.vue', () => {
  it('has the expected html structure', () => {
    expect(TermsConditions.$el).toMatchSnapshot();
  });

  it('should have "TermsConditions" as name', () => {
    expect(TermsConditions.name).toBe('TermsConditions');
  });
});

describe('_Components.vue', () => {
  it('has the expected html structure', () => {
    expect(_Components.$el).toMatchSnapshot();
  });

  it('should have "_Components" as name', () => {
    expect(_Components.name).toBe('Components');
  });
});

