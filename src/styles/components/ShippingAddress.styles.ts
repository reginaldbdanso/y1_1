import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SecureCheckout = styled.div`
  background-color: #eef2f4;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContents = styled.div`
  background-color: #eef2f4;
  display: flex;
  align-self: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 21px 0 179px;
`;

export const DividerTop = styled.div`
  align-self: stretch;
  min-height: 0px;
  margin-top: 100px;
  width: 99.9%;
  border: 1px solid #d5d5d5;
`;

export const Divider = styled.div`
  align-self: stretch;
  min-height: 0px;
  margin-top: 10px;
  width: 99.9%;
  border: 1px solid #d5d5d5;
`;

export const BreadcrumbSort = styled.div`
  display: flex;
  width: 100%;
  max-width: 70%;
  gap: 2px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 9px 0 0 0px;

  @media (max-width: 991px) {
    width: 70%;
    justify-content: center;
    gap: 2rem;
  }
`;

export const Breadcrumb = styled.div`
  align-self: start;
  display: flex;
  gap: 12px;
  color: #000;
  font: 15px Open Sans, sans-serif;
`;

export const BreadcrumbItem = styled.span<{ bold?: boolean }>`
  align-self: stretch;
  border-radius: 10px;
  background-color: #fff;
  padding: 4px 14px;
  font: ${props => props.bold ? '700' : '400'} 15px Open Sans, sans-serif;
`;

export const CheckoutContent = styled.main`
  display: flex;
  margin: 38px 39px;
  width: 100%;
  max-width: 75%;
  gap: 20px;

  @media (max-width: 991px) {
    max-width: 100%;
    flex-direction: column;
    margin: 40px 10px;
  }
`;

export const ShippingSection = styled.section`
  width: 62%;
  padding: 15px 0;

  @media (max-width: 991px) {
    width: 95%;
    align-self: center;
  }
`;

export const SectionTitle = styled.h1`
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 23px 25px;

  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;

export const ShippingForm = styled.form`
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  font-weight: 500;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 18px;
`;

export const FormGroup = styled.div`
  flex: 1;
  margin-bottom: 18px;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 49px;
  border: 1px solid #e4e4e4;
  border-radius: 10px;
  background-color: #fff;
  margin-top: 10px;
  padding: 0 15px;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  font-weight: 500;

  &::placeholder {
    color: #999;
  }
`;

export const FormCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 11px 0;
  font-weight: 400;
`;

export const HelperText = styled.p`
  color: #010101;
  margin: 11px 0 0;
  font-size: 14px;
`;

export const CheckoutButton = styled(Link)`
  background-color: #0055b6;
  color: #fff9f9;
  font-weight: 700;
  border: none;
  text-align: center;
  justify-content: center;
  padding: 20px 0;
  align-items: center;
  border-radius: 30px;
  width: 469px;
  max-width: 100%;
  margin-top: 38px;
  cursor: pointer;
  display: block;
  text-decoration: none;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;

  @media (max-width: 991px) {
    padding: 19px 20px;
  }
`;

export const OrderSummary = styled.section`
  width: 38%;

  @media (max-width: 991px) {
    width: 95%;
    align-self: center;
  }
`;

export const SummaryContainer = styled.div`
  background-color: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 10px;
  padding: 30px 22px 57px;
`;

export const SummaryHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 336px;
  max-width: 100%;
  margin: 0 auto;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  font-weight: 700;
`;

export const OrderItems = styled.div`
  margin-top: 30px;
`;

export const OrderItem = styled.article`
  display: flex;
  gap: 20px;
  margin: 20px 11px;
  position: relative;
  align-items: flex-start;
`;

export const RemoveIcon = styled.img`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    opacity: 0.8;
  }
`;

export const FirstItem = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
`;

export const ItemImage = styled.img`
  width: 89px;
  height: 84px;
  border-radius: 10px;
  object-fit: contain;
`;

export const ItemTitle = styled.h3`
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  font-weight: 500;
  margin: 10px 0 0 0;
  width: 140px;
  text-align: start;
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

export const ItemPrice = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  order: 1;
`;

export const QuantityControl = styled.div`
  border-radius: 10px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 20px;
  border: 1px solid rgba(228, 228, 228, 1);
  width: 120px;
  order: 2;
`;

export const ItemTotalPrice = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  order: 4;
`;

export const ItemDivider = styled.hr`
  border: 0;
  border-top: 1px solid #d5d5d5;
  margin: 17px 0;
`;

export const TotalSummary = styled.div`
  background-color: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 10px;
  margin-top: 28px;
  padding: 28px 41px 49px;

  @media (max-width: 991px) {
    padding: 28px 20px 49px;
  }
`;

export const SummaryGrid = styled.div`
  display: flex;
  gap: 20px;
`;

export const SummaryLabels = styled.div`
  width: 68%;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  font-weight: 500;
`;

export const SummaryValues = styled.div`
  width: 32%;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  font-weight: 700;
  text-align: right;
`;

export const TotalLabel = styled.p`
  font-size: 25px;
  font-weight: 700;
  margin-top: 35px;
`;

export const TotalValue = styled.p`
  font-size: 25px;
  font-weight: 700;
  margin-top: 35px;
`;

export const QuantityButton = styled.button`
  padding: 5px 10px;
  font-size: 18px;
  border: none;
  color: #000;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: black;
    color: #fff;
  }
`;