import { TransactionsPage } from "../pages/TransactionsPage/TransactionsPage";
import { Page } from "@playwright/test";

export async function openModal(page: Page) {

    const transactionsPage = new TransactionsPage(page);
    await transactionsPage.openTransactionsPage();
    await transactionsPage.assertTableHeadersValid();
    await transactionsPage.modalsOpen();
    await transactionsPage.assertModalOpen();

}