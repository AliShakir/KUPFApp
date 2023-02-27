using System;

namespace API.Common
{
    public static class CommonMethods
    {
        
        public static Int64 CreateEmployeeId()
        {
            Random rnd = new Random();
		    Int64 employeeId  = rnd.Next(1, 1000000); 
            return employeeId;
        }
        public static Int32 CreateUserId()
        {
            Random rnd = new Random();
            Int32 userId = rnd.Next(1, 10000);
            return userId;
        }
        public static string DecodePass(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
        public static string EncodePass(string plainText)
        {
        var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
        return System.Convert.ToBase64String(plainTextBytes);
        }

        public static int CreateSubscriberInstallments(DateTime installmentBeginDate)
        {
            int currentMonth = installmentBeginDate.Month;
            int months = currentMonth - 12;
            int remainingMonths = Math.Abs(months);
            int installments = remainingMonths + 12;
            return installments;
        }
        /// <summary>
        /// To calculate subscription duration...
        /// </summary>
        /// <param name="subscribeDate">Get total months</param>
        /// <returns></returns>
        public static int CalculateMembershipDuration(DateTime subscribeDate)
        {
            DateTime CurrentDate = DateTime.Now;
            int totalMonths = 12 * (CurrentDate.Year - subscribeDate.Year) + CurrentDate.Month - subscribeDate.Month;
            return totalMonths;
        }

        
    }
}