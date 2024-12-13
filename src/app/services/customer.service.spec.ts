import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  // Setup testing module
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Test for register method
  it('should register a customer', () => {
    const mockCustomer = {
      customerName: 'John Doe',
      email: 'john@example.com',
      contactNumber: '0889128',
      password: 'password123'
    };

    const mockResponse = { success: true, message: 'Registration successful' };

    service.register(mockCustomer).subscribe((response) => {
      expect(response.success).toBeTrue();
      expect(response.message).toBe('Registration successful');
    });

    const req = httpMock.expectOne('http://localhost:5000/register/customer');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // Test for login method
  it('should login a customer and return a token', () => {
    const credentials = {
      email: 'john@example.com',
      password: 'password123'
    };

    const mockResponse = { token: 'sample-jwt-token' };

    service.login(credentials).subscribe((response) => {
      expect(response.token).toBe('sample-jwt-token');
    });

    const req = httpMock.expectOne('http://localhost:5000/login/customer');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // Test for saveToken method
  it('should save token in local storage', () => {
    const token = 'sample-jwt-token';
    service.saveToken(token);
    expect(localStorage.getItem('auth_token')).toBe(token);
  });

  // Test for getToken method
  it('should get token from local storage', () => {
    const token = 'sample-jwt-token';
    localStorage.setItem('auth_token', token);
    expect(service.getToken()).toBe(token);
  });

  // Test for removeToken method
  it('should remove token from local storage', () => {
    localStorage.setItem('auth_token', 'sample-jwt-token');
    service.removeToken();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  // Clean up after each test
  afterEach(() => {
    httpMock.verify();
  });
});
